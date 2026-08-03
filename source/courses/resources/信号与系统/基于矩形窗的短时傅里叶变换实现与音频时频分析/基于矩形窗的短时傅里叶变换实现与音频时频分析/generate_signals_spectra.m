%% generate_signals_spectra.m
% 生成两个具有不同时频特性的测试信号，计算并绘制傅里叶变换幅度谱

clear; clc; close all;
fs = 4410;                 % 采样率 (Hz)
T = 2;                     % 信号时长 (s)
t = 0:1/fs:T-1/fs;         % 时间向量
N = length(t);             % 信号长度

% ---------- 信号1：线性扫频 ----------
f0 = 200;                  % 起始频率 (Hz)
f1 = 2000;                 % 终止频率 (Hz)
signal1 = chirp(t, f0, T, f1);

% ---------- 信号2：多音叠加瞬态高频 ----------
signal2 = 0.5 * sin(2*pi*400*t) + 0.3 * sin(2*pi*1500*t);
idx = (t >= 0.8 & t < 1.0);
signal2(idx) = signal2(idx) + 0.6 * sin(2*pi*2500*t(idx));

% ---------- 傅里叶变换 ----------
Y1 = fft(signal1);
P1 = abs(Y1 / N);
P1_single = P1(1:floor(N/2)+1);
P1_single(2:end-1) = 2 * P1_single(2:end-1);
f = fs * (0:(N/2)) / N;

Y2 = fft(signal2);
P2 = abs(Y2 / N);
P2_single = P2(1:floor(N/2)+1);
P2_single(2:end-1) = 2 * P2_single(2:end-1);

% ---------- 绘制频谱 ----------
figure;
subplot(2,1,1);
plot(f, P1_single, 'b', 'LineWidth', 1.2);
xlim([0 fs/2]);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Spectrum of Signal 1 (Chirp)');
grid on;

subplot(2,1,2);
plot(f, P2_single, 'r', 'LineWidth', 1.2);
xlim([0 fs/2]);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Spectrum of Signal 2 (Multi-tone + Burst)');
grid on;

% ---------- 保存信号 ----------
save('signal1.mat', 'signal1', 'fs', 't');
save('signal2.mat', 'signal2', 'fs', 't');