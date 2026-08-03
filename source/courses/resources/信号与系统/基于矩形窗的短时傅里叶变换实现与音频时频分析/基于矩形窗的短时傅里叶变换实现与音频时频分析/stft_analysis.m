%% stft_analysis.m
% 对两个信号进行矩形窗短时傅里叶变换，比较不同窗长对时频图的影响

clear; clc; close all;

% ---------- 载入信号 ----------
if ~exist('signal1.mat', 'file')
    generate_signals_spectra;
end
load('signal1.mat', 'signal1', 'fs');
load('signal2.mat', 'signal2', 'fs');

% ---------- 参数设置 ----------
win_sizes = [64, 128, 256, 512];   % 不同的窗长 (点数)
hop = 32;                          % 帧移 (点数)

% ---------- 信号1的时频图 ----------
figure('Name', 'Signal 1 (Chirp) STFT with different window lengths', ...
       'Position', [100, 100, 1200, 800]);
for i = 1:length(win_sizes)
    win_len = win_sizes(i);
    [S, f, t] = my_stft(signal1, fs, win_len, hop);
    subplot(2, 2, i);
    imagesc(t, f, 20*log10(abs(S) + eps));
    axis xy;
    xlabel('Time (s)');
    ylabel('Frequency (Hz)');
    title(['Window size = ', num2str(win_len)]);
    colorbar; colormap jet; caxis([-60 0]);
end
sgtitle('STFT of Signal 1 (Chirp)');

% ---------- 信号2的时频图 ----------
figure('Name', 'Signal 2 (Multi-tone + Burst) STFT with different window lengths', ...
       'Position', [100, 100, 1200, 800]);
for i = 1:length(win_sizes)
    win_len = win_sizes(i);
    [S, f, t] = my_stft(signal2, fs, win_len, hop);
    subplot(2, 2, i);
    imagesc(t, f, 20*log10(abs(S) + eps));
    axis xy;
    xlabel('Time (s)');
    ylabel('Frequency (Hz)');
    title(['Window size = ', num2str(win_len)]);
    colorbar; colormap jet; caxis([-60 0]);
end
sgtitle('STFT of Signal 2 (Multi-tone + Burst)');

% =================== 矩形窗 STFT ===================
function [S, f, t] = my_stft(x, fs, win_len, hop)
    x = x(:);
    N = length(x);
    win = rectwin(win_len);
    frame_starts = 1:hop:(N - win_len + 1);
    num_frames = length(frame_starts);
    S = zeros(win_len/2 + 1, num_frames);
    for k = 1:num_frames
        idx = frame_starts(k):(frame_starts(k) + win_len - 1);
        segment = x(idx) .* win;
        Y = fft(segment);
        Y_single = Y(1:win_len/2 + 1);
        Y_single(2:end-1) = 2 * Y_single(2:end-1);
        S(:, k) = Y_single / win_len;
    end
    f = (0:win_len/2) * fs / win_len;
    t = (frame_starts - 1) / fs;
end