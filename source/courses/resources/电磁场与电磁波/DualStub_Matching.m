% 双枝节匹配
% 功能：根据输入参数计算两个并联枝节的长度，并判断盲区。
% 备注：所有长度均以电长度表示。
clear; clc;

% ============== 用户输入参数==============
Zc = 50;     % 特征阻抗（Ω）
ZL = 30-1j*40;     % 负载阻抗（Ω）
d1 = 0;    % 负载到第一个枝节的距离（λ）
d2 = 0.125;  % 两枝节间距（λ），常见0.125或0.25
stub_type = 'short';     % 枝节类型：short短路或open开路

% ============== 调用核心函数 ==============
[solutions, is_blind] = double_stub_matching(Zc, ZL, d1, d2, stub_type);

% ============== 输出结果 ==============
fprintf('\n==================== 双枝节匹配结果 ====================\n');
fprintf('Zc = %.2f Ω\n', Zc);
fprintf('ZL = %.2f + j%.2f Ω\n', real(ZL), imag(ZL));
fprintf('d1 = %.4f λ\n', d1);
fprintf('d2 = %.4f λ\n', d2);
fprintf('枝节类型：%s\n', stub_type);

if is_blind
    fprintf('\n【盲区】当前参数无解，无法实现匹配。\n');
else
    fprintf('\n找到2组解（单位：λ）：\n');
    fprintf('解1：l1 = %.4f λ，l2 = %.4f λ\n', solutions(1,1), solutions(1,2));
    fprintf('解2：l1 = %.4f λ，l2 = %.4f λ\n', solutions(2,1), solutions(2,2));
    % 推荐总长度较短的一解
    [~, idx] = min(sum(solutions, 2));
    fprintf('（推荐解%d，总长度较短）\n', idx);
end
fprintf('=======================================================\n');

% ========================================================================
% 核心计算函数
% ========================================================================
function [solutions, is_blind] = double_stub_matching(Zc, ZL, d1, d2, stub_type)
    % solutions N×2矩阵，每行为 [l1, l2]（波长倍数）
    % is_blind true表示盲区（无解）

    % 归一化负载导纳 yL = Zc/ZL
    yL = Zc/ZL;
    theta1 = 2 * pi * d1;
    theta2 = 2 * pi * d2;
    t1 = tan(theta1);
    t2 = tan(theta2); 
    % 步骤1：负载导纳经过 d1 变换到第一个枝节处
    y1 = (yL + 1j*t1) / (1 + 1j*yL*t1);
    g1 = real(y1);
    b1 = imag(y1);

    % 步骤2：盲区判断
    % 条件：g1 > 1 + 1/(t2^2)
    g1_crit = 1 + 1 / (t2^2);   % 临界电导
    if g1 > g1_crit
        solutions = [];
        is_blind = true;
        return;
    end
    is_blind = false;

    % 步骤3：求解 b1'（第一个枝节后的总电纳）
    % 方程：(1 - b1'*t2)² = g1*(1 + t2² - g1*t2²)
    discriminant = g1 * (1 + t2^2 - g1 * t2^2);
    if discriminant < 0
        solutions = [];
        is_blind = true;
        return;
    end
    sqrt_disc = sqrt(discriminant);
    b1_prime_vals = [(1 - sqrt_disc)/t2, (1 + sqrt_disc)/t2];

    % 步骤4：计算两个枝节的电纳及长度
    solutions = zeros(2,2);
    for k = 1:2
        b1_prime = b1_prime_vals(k);
        % 第一个枝节电纳
        b_s1 = b1_prime - b1;
        % 从y1'经过d2变换到第二个枝节处
        y1_prime = g1 + 1j*b1_prime;
        y2 = (y1_prime + 1j*t2) / (1 + 1j*y1_prime*t2);
        b2 = imag(y2);
        % 第二个枝节电纳
        b_s2 = -b2;
        % 将电纳转换为枝节长度（波长倍数）
        l1 = stub_length_from_susceptance(b_s1, stub_type);
        l2 = stub_length_from_susceptance(b_s2, stub_type);
        solutions(k,:) = [l1, l2];
    end
end

% ========================================================================
% 辅助函数：由电纳求枝节长度（结果单位：λ）
% ========================================================================
function l_lambda = stub_length_from_susceptance(b, stub_type)
    % 计算并联枝节长度（波长倍数）
    % b表示枝节导纳的虚部  
    % stub_type为short短路或open开路
    if strcmpi(stub_type, 'short')
        % 短路枝节：yin = -j*cot(θ)
        % 要求yin = j*b，则cot(θ) = -b
        if b == 0
            theta = pi/2;
        else
            theta = atan(-1/b);
            if theta < 0
                theta = theta + pi;  % 保证 θ ∈ (0, π)
            end
        end
    elseif strcmpi(stub_type, 'open')
        % 开路枝节：yin = j*tan(θ)
        % 要求 yin = j*b，则tan(θ) = b
        if b == 0
            theta = 0; 
        else
            theta = atan(b);
            if theta < 0
                theta = theta + pi;
            end
        end
    else
        error('stub_type 必须为 ''short'' 或 ''open''');
    end
    l_lambda = theta / (2*pi);   % 长度 = θ/(2π) λ
end