%% music_stft_animation.m
% 利用矩形窗短时傅里叶变换，对音乐信号进行实时频谱柱状图动画显示
% 幅度采用线性刻度，关闭窗口时自动停止播放

clear; clc; close all;

% ---------- 参数设置 ----------
mp3_path     = '星茶会.mp3';      % 音乐文件路径
freq_range   = [20, 2500];        % 显示频率范围 (Hz)
nbins        = 96;                % 频带数量
bar_width    = 0.3;               % 柱状图宽度
win_len_ms   = 100;               % STFT 窗长 (ms)
timer_period = 0.05;              % 画面刷新间隔 (s)
max_duration = inf;               % 处理时长上限 (s)，inf 为完整音乐
save_video   = true;              % 是否保存视频
video_name   = 'spectrum_live.avi';

% ---------- 读取音频 ----------
[data, Fs] = audioread(mp3_path);
if size(data,2)==2
    data = mean(data,2);          % 转单声道
end
data = data(:)';
if ~isinf(max_duration)
    Nmax = round(max_duration*Fs);
    data = data(1:min(Nmax, end));
end

% ---------- 矩形窗 STFT ----------
win_len = round(win_len_ms/1000*Fs);
if mod(win_len,2)~=0
    win_len = win_len+1;
end
hop = round(win_len/8);           % 高重叠率，提高时间分辨率
[S, f_full, t_stft] = my_stft(data, Fs, win_len, hop);

% ---------- 频率范围截取 ----------
idx_f = (f_full>=freq_range(1) & f_full<=freq_range(2));
f_sel = f_full(idx_f);
S_amp = abs(S(idx_f,:));

% ---------- 等宽频带划分 ----------
bin_edges = linspace(freq_range(1), freq_range(2), nbins+1);
f_bin_center = (bin_edges(1:end-1)+bin_edges(2:end))/2;
S_bin = zeros(nbins, size(S_amp,2));
for i = 1:nbins
    mask = (f_sel>=bin_edges(i)) & (f_sel<bin_edges(i+1));
    if i==nbins
        mask = (f_sel>=bin_edges(i)) & (f_sel<=bin_edges(i+1));
    end
    S_bin(i,:) = mean(S_amp(mask,:),1);
end

% ---------- 设定纵轴上限 ----------
y_max_val = max(S_bin(:)) * 0.8;
if y_max_val == 0
    y_max_val = 1;
end

% ---------- 创建图形窗口 ----------
hf = figure('Name','Live Music Spectrum', ...
    'Position',[100 100 800 450], 'Resize','off', ...
    'CloseRequestFcn', @close_window);
hBar = bar(f_bin_center, zeros(nbins,1), 'BarWidth',bar_width, ...
    'FaceColor',[0 0.4 0.8], 'EdgeColor',[0.2 0.5 0.8], 'LineWidth',0.5);
xlim(freq_range);
ylim([0, y_max_val]);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Real-time Spectrum (waiting...)');
grid on;
drawnow;

% ---------- 创建音频播放器 ----------
global music_global;              % 使用全局变量以便回调中停止
music_global = audioplayer(data, Fs);

% ---------- 准备视频写入 ----------
if save_video
    v = VideoWriter(video_name);
    v.FrameRate = round(1/timer_period);
    open(v);
end

% ---------- 主循环 ----------
play(music_global);
while isplaying(music_global) && ishandle(hf)
    cur_sample = music_global.CurrentSample;
    cur_time = (cur_sample-1)/Fs;
    [~, idx] = min(abs(t_stft - cur_time));
    set(hBar, 'YData', S_bin(:, idx));
    title(sprintf('Time: %.2f s', cur_time));
    drawnow;
    if save_video && ishandle(hf)
        frame = getframe(hf);
        writeVideo(v, frame);
    end
    pause(timer_period);
end

% ---------- 清理 ----------
if isplaying(music_global)
    stop(music_global);
end
if save_video
    close(v);
    fprintf('视频已保存：%s\n', fullfile(pwd, video_name));
end
if ishandle(hf)
    close(hf);
end

% =================== 窗口关闭回调 ===================
function close_window(~, ~)
    global music_global;
    try
        if isplaying(music_global)
            stop(music_global);
        end
    catch
    end
    delete(gcf);
end

% =================== 矩形窗 STFT ===================
function [S, f, t] = my_stft(x, fs, win_len, hop)
    x = x(:);
    N = length(x);
    win = rectwin(win_len);
    starts = 1:hop:(N - win_len + 1);
    nFrames = length(starts);
    S = zeros(win_len/2+1, nFrames);
    for k = 1:nFrames
        idx = starts(k):starts(k)+win_len-1;
        segment = x(idx).*win;
        Y = fft(segment);
        Y_s = Y(1:win_len/2+1);
        Y_s(2:end-1) = 2*Y_s(2:end-1);
        S(:,k) = Y_s/win_len;
    end
    f = (0:win_len/2)*fs/win_len;
    t = (starts-1)/fs;
end