---
title: Projects
date: 2026-07-29 00:00:00
aside: false
indexing: false
---
<!-- markdownlint-disable MD033 -->
<div class="knowledge-page">
<aside class="knowledge-sidebar">
<div class="knowledge-sidebar-title">Projects</div>
<ul class="knowledge-tree">
<li><a href="#overview">总述</a></li>
<li><details open><summary>实验课</summary><ul>
<li><a href="#electronic-engineering-training">电子工程训练</a></li>
<li><a href="#electronic-circuit-design-experiment">电子电路设计实验</a></li>
<li><a href="#digital-system-design-experiment">数字系统设计实验</a></li>
<li><a href="#electromagnetic-field-wave-experiment">场波实验</a></li>
<li><a href="#info-electronic-engineering-intro-experiment">信电导实验</a></li>
<li><a href="#artificial-intelligence-experiment">人工智能实验</a></li>

</ul></details></li>
<li><details open><summary>短学期</summary><ul>
<li><a href="#mcu-development">单片机开发</a></li>
<li><a href="#yolo-image-detection">YOLO图像检测</a></li>
</ul></details></li>
</ul>
</aside>
<div class="knowledge-content">

<section id="overview" class="active">
<h2>总述</h2>
<p>Projects 用于存放课程实验的报告、代码与工程文件，还会存放短学期过程中积累的项目资料。</p>
</section>

<section id="electronic-circuit-design-experiment">
<h2>电子电路设计实验</h2>
<h3>电子电路设计实验Ⅰ</h3>
<p>本系列实验报告涵盖六个文件，依次为：基尔霍夫定律与叠加定理实验、一阶 RC 电路瞬态响应实验、 OrCAD 软件仿真练习、晶体管共射放大电路设计实验、集成运放基本运算电路实验、集成运放应用电路实验。各实验均包含理论计算、电路搭建、数据测量及部分仿真对比。</p>
<h4>Lab1 ：基尔霍夫定律与叠加定理实验研究</h4>
<p>该报告包含两个独立实验。第一部分在直流电阻网络中分别接入电阻和二极管，测量支路电流与节点电压，将实测值与理论值对比，验证 KCL 和 KVL 。第二部分在同一网络中分别测量 U1 单独作用、 U2 单独作用及两者共同作用时的支路电流和节点电压，并更换二极管重复测量，记录叠加性成立与否的结果；同时计算了电阻功率，给出功率不具有叠加性的数据。</p>
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅰ/Lab1.pdf">查看基尔霍夫定律与叠加定理实验研究实验报告</a></p>
<h4>Lab2 ：一阶RC电路的瞬态响应过程实验研究</h4>
<p>该实验采用 555 定时器和电子开关产生周期性方波激励，用示波器观测不同 RC 组合下的零输入响应与零状态响应波形。通过 Cursor 功能测量电容电压波形，获得时间常数 τ 的实测值，并与理论值进行比较，列出相对误差。</p>
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅰ/Lab2.pdf">查看一阶RC电路的瞬态响应过程实验研究实验报告</a></p>
<h4>Lab3 ： OrCAD 软件使用练习</h4>
<p>该仿真实验包含三个电路：二极管伏安特性、桥式整流电路、稳压二极管瞬态响应。分别进行直流扫描分析和瞬态分析，得到二极管 I‑V 曲线、整流输出波形和稳压输出波形，并记录了不同温度下的特性曲线变化。</p>
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅰ/Lab3.pdf">查看 OrCAD 软件使用练习实验报告</a></p>
<h4>Lab4 ：晶体管共射放大电路设计、仿真与测试</h4>
<p>该设计性实验首先根据给定指标计算元件参数，然后用 OrCAD 仿真静态工作点、增益、输入/输出电阻及幅频响应，最后实际搭建电路测量静态工作点、增益、输入输出电阻和上下限截止频率。另通过改变 RE1 、 CE 及在 B‑C 间接入电容，观察增益、下限频率和上限频率的变化。</p>
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅰ/Lab4.pdf">查看晶体管共射放大电路设计、仿真与测试实验报告</a></p>
<h4>Lab5 ：集成运算放大器基本运算电路研究（一）</h4>
<p>该实验设计反相放大器和反向权重加法器。分别输入直流和交流信号，测量输入输出电压幅值及相位关系，验证反相和加法运算功能。另通过改变反馈电阻 Rf ，测定不同增益下的带宽，计算增益带宽积，并给出实测与仿真数据对比。</p>
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅰ/Lab5.pdf">查看集成运算放大器基本运算电路研究（一）实验报告</a></p>
<h4>Lab6 ：集成运算放大器应用电路研究（二）</h4>
<p>该实验包含反相积分器、迟滞比较器和方波‑三角波发生器。积分器将方波转换为三角波，比较有无反馈电阻 Rf 时的输出直流分量；迟滞比较器将三角波转换为方波，测量输入输出峰峰值和阈值电压；方波‑三角波发生器由前两者级联构成，调节电位器改变输出频率，记录可调频率范围及输出电压幅值变化。</p>
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅰ/Lab6.pdf">查看集成运算放大器应用电路研究（二）实验报告</a></p>
<hr>
<h3>电子电路设计实验Ⅱ</h3>
<p>本补充报告包含两个独立实验：电压电流转换器设计与倒计时定时器设计。前者为基础信号调理电路，将 4~20mA 电流信号转换为 0~10V 电压信号，使用 Altium Designer 完成原理图与 PCB 设计，焊接后实测数据与理论值对比验证；后者为基于 Arduino UNO 的嵌入式系统综合项目，包含硬件扩展板设计、共阴极数码管驱动、旋转编码器输入、蜂鸣器报警及三种工作模式的程序编写与系统联调。两个实验分别侧重模拟信号调理与数字控制系统的完整开发流程。</p>
<h4>电压电流转换器设计</h4>
<p>该实验设计一个电流-电压转换电路，将 4~20mA 标准电流信号转换为 0~10V 标准电压信号。电路采用反相比例放大结构，电流经采样电阻转换为电压后由运放调理至目标输出范围。使用 Altium Designer 完成原理图绘制和 PCB 单面板布线设计，焊接后逐级测试输入输出关系，记录 4mA、8mA、12mA、16mA、20mA 五个电流点对应的实测电压值，并与理论电压值进行对比。</p>
<h4>倒计时定时器的设计、制作与调试</h4>
<p>该实验用 Arduino UNO 设计倒计时定时器，包含旋转编码器、共阴极数码管和有源蜂鸣器。软件部分将共阳极参考代码适配为共阴极逻辑，修改段码表、位选电平及段选输出函数；时间设定从预设数组跳选改为连续调秒， EEPROM 存储分钟和秒数值。功能包含三种模式：正常倒计时模式、番茄钟模式、LOAD负载模式。
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅱ/电设实验报告.pdf">查看电子电路设计实验Ⅱ报告</a></p>
<h4>原理图与 PCB 工程</h4>
<p>本压缩包包含上述两个实验的 Altium Designer 工程文件：<br><strong>I-V Transfer ：</strong>电压电流转换器原理图与单面板 PCB 布局，采用反相比例放大结构，输入 4~20mA 、输出 0~10V 。<br><strong>Arduino Clock ：</strong>倒计时定时器扩展板原理图与 PCB 布局，包含四位共阴极数码管、旋转编码器、蜂鸣器及三极管位选驱动电路。</p>
<p><a href="/projects/resources/电子电路设计实验/电子电路设计实验Ⅱ/原理图与PCB.zip">下载电子电路设计实验Ⅱ原理图与 PCB 工程.zip</a></p>
</section>

<section id="electronic-engineering-training">
<h2>电子工程训练</h2>
<p>本报告集包含三个实验项目，分别为电子工程训练基础部分（常用电子仪器使用与电路板调试）、智能插座 DIY （电装、调试与系统测试）及电子工程训练课程总结。三个项目依次递进：基础部分涵盖万用表、电源、信号源与示波器的操作练习，以及呼吸灯、幸运转盘、贴片流水灯三块电路板的调试；智能插座项目完成从元器件电装、供电与 USB 控制电路测试、温度与电流标定，到与 ESP32 主板联调及手机 APP 控制的完整开发流程；课程总结报告则对上述内容及履带式机器人项目进行整体回顾。</p>
<h3>常用电子仪器使用与电路板调试</h3>
<p>该报告包含常用电子仪器使用练习与电路板调试两部分。仪器部分使用万用表测量色环电阻、电容器、二极管正向压降及三极管管脚；使用直流电源设定并测量正负电压及短路限制电流；使用信号源与示波器测量不同频率和不同波形的参数，并记录电压量程、扫描时间及幅度频率测量值。电路板调试部分分别对呼吸灯、幸运转盘及贴片流水灯进行波形测量与记录。</p>
<p><a href="/projects/resources/电子工程训练/工训基础.pdf">查看常用电子仪器使用与电路板调试实验报告</a></p>
<h3>智能插座的电装、调试与系统测试</h3>
<p>该实验完成智能插座的电装、调试与系统测试。电装阶段按元器件高度从低到高依次焊接，并通过四项测试验证：供电电路、USB 插座供电控制、指示灯与按钮电路及电装总体通电。调试阶段包括基于硬件调整温度值标定和基于软件后处理的电流标定。软硬件联调测试三个任务：确定 USB 插座控制引脚、测量各类用电器的电流与温度值、实现温控风扇自动启停及电压异常 LED 告警。系统测试阶段连接手机 APP ，验证手动开关控制、定时开关、延时开关以及超电压、欠电压、超电流、超功率、高低温六种告警与自动断电功能，各测试用例均记录实验数据与结论。</p>
<p><a href="/projects/resources/电子工程训练/电工训实验报告.pdf">查看智能插座的电装、调试与系统测试实验报告</a></p>
<h3>电子工程训练课程总结报告</h3>
<p>该报告为课程整体总结，涵盖三个训练项目。项目一为电子装配工程认知，包括元器件识别与测试、双列直插器件焊接及贴片器件焊接，以及相应电路调试。项目二为智能插座 DIY ，按分模块电装思路完成焊接，经供电电路、USB 控制、指示灯及初步通电四项测试确认硬件无误后进行调试，完成温度标定、电流标定、软硬件联调及手机 APP 系统测试。项目三为履带式机器人，包含基础结构安装、传感器安装调试、机械臂与摄像头安装，以及程序展示与验收。报告另附课程感想与收获，涵盖实践技能、系统思维、团队协作等方面。</p>
<p><a href="/projects/resources/电子工程训练/电子工程训练课程总结报告.pdf">查看电子工程训练课程总结报告</a></p>
<h3>WiFi 智能小车最终照片</h3>
<img src="/img/wificar.png" alt="WIFI小车图片">
</section>

<section id="digital-system-design-experiment">
<h2>数字系统设计实验</h2>
<p>数字系统设计实验包含组合逻辑模块设计和音乐播放器两个项目。因为这部分提供了 Verilog 代码，所以说明重点放在模块划分、顶层连接和完整工程组织上。</p>
<h3>常用组合电路模块的设计</h3>
<p>本实验完成两个组合逻辑电路的设计与验证：<br><strong>两数之差的绝对值电路：</strong>输入两个 4 位无符号二进制数，输出两者之差的绝对值<br><strong>模式比较器电路：</strong>输入两个 8 位无符号二进制数和一个模式控制信号 m ，m 控制输出最大最小值<br>两个电路均采用自顶向下的层次化设计方法，通过调用比较器、数据选择器、加法器等基本模块进行组合。</p>
<h4>任务一：两数之差的绝对值电路</h4>
<p>两数之差的绝对值采用补码加法完成减法运算，电路结构分为三个层次：比较器比较两输入数大小；两个二选一数据选择器分别选出最大值和最小值；四位全加器实现补码加法。</p>
<pre class="code-sample"><code>module abs_dif(aIn,bIn,out);
    input[3:0] aIn,bIn;
    output[3:0] out;
    wire agb;
    comp #(.n(4)) comp_inst(.a(aIn), .b(bIn), .agb(agb), .aeb(), .alb());
    wire[3:0] max,min;
    mux_2to1 #(.n(4)) mux1(.out(max), .in0(aIn), .in1(bIn), .addr(~agb));
    mux_2to1 #(.n(4)) mux2(.out(min), .in0(aIn), .in1(bIn), .addr(agb));
    wire[2:0] c;
    full_adder adder0(.a(max[0]), .b(~min[0]), .s(out[0]), .ci(1'b1), .co(c[0]));
    full_adder adder1(.a(max[1]), .b(~min[1]), .s(out[1]), .ci(c[0]), .co(c[1]));
    full_adder adder2(.a(max[2]), .b(~min[2]), .s(out[2]), .ci(c[1]), .co(c[2]));
    full_adder adder3(.a(max[3]), .b(~min[3]), .s(out[3]), .ci(c[2]), .co());
endmodule</code></pre>
<h4>任务二：模式比较器电路</h4>
<p>电路根据模式信号 m 控制输出最大值或最小值。比较器输出 agb 标志，同或门将 agb 与 m 组合生成地址信号，数据选择器据此输出对应结果。</p>
<pre class="code-sample"><code>module ModeComparator(a,b,m,y);
    input m;
    input [7:0] a,b;
    output [7:0] y;
    wire agb;
    comp #(.n(8))compare1(.a(a),.b(b),.agb(agb),.aeb(),.alb());
    wire addr;
    xnor_gate xnor1(.a(agb),.b(m),.out(addr));
    mux_2to1 #(.n(8))mux(.out(y),.in0(a),.in1(b),.addr(addr));
endmodule</code></pre>
<p><a href="/projects/resources/数字系统设计实验/常用组合电路模块的设计/常用组合电路模块的设计实验报告.pdf">查看常用组合电路模块的设计实验报告</a></p>
<p><a href="/projects/resources/数字系统设计实验/常用组合电路模块的设计/lab5_combination.zip">下载 lab5_combination 工程.zip</a></p>
<h3>音乐播放实验</h3>
<p>本实验分为两个部分：DDS 正弦信号发生器设计与音乐播放器设计。<br><strong>DDS 正弦信号发生器：</strong>要求采样频率 48kHz ，输出频率范围 20Hz~20kHz ，信号序列宽度 16 位，采用相位累加器 + 四分之一周期正弦 ROM 的结构，通过频率控制字 K 实现频率调节。<br><strong>音乐播放器：</strong>基于DDS技术，将乐曲音符映射为对应的频率控制字，通过状态机控制音符播放时序，最终通过音频编解码芯片输出至扬声器。系统包含主控制器、乐曲读取、音符播放、节拍定时、同步化电路和音频接口等模块，支持四首乐曲存储、播放/暂停、切歌及 LED 指示功能。</p>
<h4>总体架构与顶层模块</h4>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;">
    <tr style="background:#f2f2f2;"><th style="text-align:left;">模块</th><th style="text-align:left;">功能</th></tr>
    <tr><td>mcu</td><td>主控制器，处理按键输入，输出播放使能和乐曲编号</td></tr>
    <tr><td>song_reader</td><td>根据乐曲编号从 ROM 读取音符（note）和音长（duration）</td></tr>
    <tr><td>note_player</td><td>将音符映射为 DDS 频率控制字，控制正弦波输出</td></tr>
    <tr><td>synchronizer</td><td>将音频接口的 NewFrame 脉冲同步至系统时钟域</td></tr>
    <tr><td>divider_n</td><td>对 48kHz 的 ready 脉冲进行 1000 分频，产生 48Hz 节拍 beat </td></tr>
    <tr><td>dds</td><td>直接数字频率合成器，生成 16 位正弦波采样值</td></tr>
</table>
<p>顶层模块 music_player 将上述模块例化连接：</p>
<pre class="code-sample"><code>module music_player(clk,reset,play_pause,next,NewFrame,sample,play,song);
    parameter sim=0;
    input clk,reset,play_pause,next,NewFrame;
    output [15:0] sample;
    output play;
    output [1:0] song;
    wire [5:0] duration,note;
    wire song_done,reset_play,note_done,new_note,ready,beat;
    mcu mcu_inst(...);
    song_reader song_reader_inst(...);
    note_player note_player_inst(...);
    synchronizer synchronizer_inst(...);
    divider_n #(.n(sim?64:1000), .counter_bits(sim?6:10)) divider_1000(...);
endmodule</code></pre>
<h4>DDS 正弦信号发生器</h4>
<p>DDS 采用 22 位相位累加器，高 2 位用于区分正弦波四个象限，中间 10 位作为四分之一周期 ROM 地址。addr_process 将原始地址映射为 0~1023 范围内的 ROM 地址，data_process 根据象限对 ROM 数据进行取反处理，输出 16 位补码格式的正弦采样值。</p>
<pre class="code-sample"><code>// 地址处理：根据 raw_addr[10] 判断所在半周期，决定 ROM 地址
module addr_process(raw_addr,rom_addr);
    input [10:0] raw_addr;
    output reg [9:0] rom_addr;
    always@(*) begin
        if(raw_addr[10]==0) rom_addr = raw_addr[9:0];
        else rom_addr = 1023 - raw_addr[9:0];
    end
endmodule

// 数据处理：第二、三象限对数据取反
module data_process(raw_data,area,data);
    input area;
    input [15:0] raw_data;
    output [15:0] data;
    assign data = area ? (~raw_data + 1'b1) : raw_data;
endmodule</code></pre>
<p>DDS顶层将相位累加、地址映射、ROM查表与数据整形串联：</p>
<pre class="code-sample"><code>module dds(k,clk,reset,sampling_pulse,sample,new_sample_ready);
    input [21:0] k;
    input clk,reset,sampling_pulse;
    output [15:0] sample;
    output new_sample_ready;
    // 22位相位累加器
    adder_Nbit #(.N(22)) adder_22bit(.a(k), .b(raw_addr), .sum(adder_sum));
    dff #(.WIDTH(22)) dff1(.D(adder_sum), .Q(raw_addr), .CLK(clk), .RST(reset), .EN(sampling_pulse));
    // 地址映射与ROM查表
    addr_process apro(.raw_addr(raw_addr[20:10]), .rom_addr(rom_addr));
    sine_rom rom(.clk(clk), .addr(rom_addr), .dout(raw_data));
    // 数据整形
    data_process dpro(.raw_data(raw_data), .area(raw_addr[21]), .data(data));
    // 输出寄存器
    dff #(.WIDTH(16)) dff3(.D(data), .Q(sample), .CLK(clk), .RST(0), .EN(sampling_pulse));
endmodule</code></pre>
<h4>音符播放模块</h4>
<p>note_player 将音符标记（6位）映射为 DDS 频率控制字（20位），并在指定音长内持续输出对应频率的正弦波。其内部包含三个关键子模块：<br>frequency_rom ：64×20 位查找表，将 6 位音符地址转换为 20 位相位增量 K<br>beat_timer ：以 48Hz 节拍为基准，按 duration 计拍，产生 timer_done 信号<br>note_player_controller ：状态机控制音符装载、定时和音符完成信号的产生</p>
<pre class="code-sample"><code>module note_player(clk,reset,play_enable,note_to_load,duration_to_load,
                    load_new_note,note_done,sampling_pulse,beat,sample,sample_ready);
    // 控制器：产生load脉冲、定时器清零和note_done
    note_player_controller ctrl_inst(.clk(clk), .reset(reset), .play_enable(play_enable),
                        .load_new_note(load_new_note), .timer_done(timer_done),
                        .timer_clear(timer_clear), .load(load), .note_done(note_done));
    // 节拍定时器：按duration计数拍数
    beat_timer timer_inst(.clk(clk), .beat(beat), .timer_clear(timer_clear),
                        .duration_to_load(duration_to_load), .timer_done(timer_done));
    // 音符寄存器：load有效时锁存note_to_load
    dff #(.WIDTH(6)) note_dff(.D(note_to_load), .Q(addr), .CLK(clk), 
                               .RST(~play_enable||reset), .EN(load));
    // 频率查找表
    frequency_rom rom_inst(.clk(clk), .addr(addr), .dout(k));
    // DDS模块：k高位补两个0扩展至22位
    dds dds_inst(.k({2'b00,k}), .clk(clk), .reset(~play_enable||reset),
                .sampling_pulse(sampling_pulse), .sample(sample), ...);
endmodule</code></pre>
<h4>主控制器状态机</h4>
<p>mcu_controller 为四状态状态机，处理播放/暂停、切歌和乐曲结束响应：</p>
<pre class="code-sample"><code>// 状态说明：
//   RESET : 上电/复位态，输出reset_play脉冲，自动跳转到PAUSE
//   PAUSE : 暂停态，等待play_pause或next按键
//   PLAY  : 播放态，输出play=1；可由play_pause转入暂停，next切歌，song_done结束
//   NEXT  : 切歌态，产生NextSong脉冲并复位下游，自动进入PLAY

always@(*) begin
    play=0; reset_play=0; NextSong=0;
    case(state)
        RESET: begin reset_play=1; next_state=PAUSE; end
        PAUSE: begin
            if(play_pause) next_state=PLAY;
            else if(next) next_state=NEXT;
            else next_state=PAUSE;
        end
        PLAY: begin
            play=1;
            if(play_pause) next_state=PAUSE;
            else if(next) next_state=NEXT;
            else if(song_done) next_state=RESET;
            else next_state=PLAY;
        end
        NEXT: begin NextSong=1; reset_play=1; next_state=PLAY; end
        default: next_state=RESET;
    endcase
end</code></pre>
<p><a href="/projects/resources/数字系统设计实验/音乐播放实验/音乐播放实验实验报告.pdf">查看音乐播放实验报告</a></p>
<p><a href="/projects/resources/数字系统设计实验/音乐播放实验/lab19_MusicPlayer.zip">下载 lab19_MusicPlayer 工程.zip</a></p>
</section>

<section id="electromagnetic-field-wave-experiment">
<h2>电磁场与电磁波实验</h2>
<p>本报告集包含四个实验项目，涵盖微带传输线测量、波导传输线测量、喇叭天线辐射特性测量和喇叭天线 CST 仿真。四个实验分别从传输线理论（微带线与波导）、天线测量和电磁仿真三个维度展开：微带线实验使用矢量网络分析仪测量不同负载下的反射系数与阻抗特性；波导实验通过驻波测量线测定波导波长和容性膜片负载特性，并用单销钉调配器完成阻抗匹配；天线测量实验在天线综合测控系统上完成方向图、极化和传输衰减测量；仿真实验使用 CST 软件建立角锥喇叭天线模型并进行全波仿真分析。</p>
<h3>微带传输线负载特性矢网测量</h3>
<p>该实验使用矢量网络分析仪测量 50Ω 半波长微带传输线在开路、短路、匹配电阻、1pF 电容和 3.3nH 电感五种负载状态下的反射特性（S11 参数），观察史密斯圆图上的阻抗轨迹，记录 2.3~2.7GHz 频率范围内各关键频点的反射系数测量值并与理论值对比。随后将天线通过 SMA-N 转接头直接接至矢网端口，测量 1~3GHz 频段内的驻波比特性，找到驻波比最小点对应的频率。最后进行微带滤波器的 S21 传输特性测量，读取中心频率、3dB 带宽、插入损耗和阻带衰减等参数。实验还包含 N-SMA 转接头影响分析与 50Ω 微带线宽度长度的理论计算。</p>
<p><a href="/projects/resources/电磁场与电磁波实验/实验一、 微带传输线负载特性矢网测量2026.pdf">查看微带传输线负载特性矢网测量讲义</a></p>
<p><a href="/projects/resources/电磁场与电磁波实验/胡东东+微带传输线负载特性矢网测量.pdf">查看微带传输线负载特性矢网测量报告</a></p>
<h3>波导传输线负载特性测量与阻抗匹配</h3>
<p>该实验在X波段矩形波导上完成波导波长测量、容性膜片负载特性测量和单销钉阻抗匹配三部分内容。用直读式频率计测定工作频率，通过短路块形成纯驻波后测量相邻波节点间距计算波导波长实测值，并与理论公式计算值比较。将容性膜片加匹配负载接至测量线终端，测量驻波系数和第一个波节点相对短路面的位移，在史密斯圆图上读出负载的反射系数和归一化阻抗。在测量线与负载之间串接单销钉调配器，反复调节销钉插入深度与纵向位置使反射最小，计算匹配后的驻波系数，并从圆图说明匹配原理。</p>
<p><a href="/projects/resources/电磁场与电磁波实验/实验二、波导传输线负载测量与阻抗匹配2026.pdf">查看波导传输线负载特性测量与阻抗匹配讲义</a></p>
<p><a href="/projects/resources/电磁场与电磁波实验/胡东东+波导传输线负载特性测量与阻抗匹配.pdf">查看波导传输线负载特性测量与阻抗匹配报告</a></p>
<h3>喇叭天线的辐射特性测量</h3>
<p>该实验在天线综合测控系统上完成喇叭天线的电路参数与辐射参数测量。电路特性方面，测量 S11 驻波比和 S21 扫频传输曲线。辐射特性方面，在 6~8GHz 频段内测量水平面和垂直面极坐标方向图，读取主瓣方向、3dB 波束宽度和副瓣电平。极化特性方面，测量接收信号随发射天线极化角 θ 的变化曲线，判断符合 cosθ 还是 cos²θ 关系；在收发天线间插入极化栅网，观察栅网对正交极化传输的耦合作用。另通过改变收发天线间距测量接收功率随距离的衰减，验证 1/R² 规律。实验报告包含远场区距离计算、收发天线理论增益与波束宽度估算，以及实测方向图与 CST 仿真结果的对比分析。</p>
<p><a href="/projects/resources/电磁场与电磁波实验/实验三、喇叭天线的幅射特性测量2026.pdf">查看喇叭天线辐射特性测量讲义</a></p>
<p><a href="/projects/resources/电磁场与电磁波实验/胡东东+喇叭天线的幅射特性测量.pdf">查看喇叭天线辐射特性测量报告</a></p>
<h3>矩形波导馈电角锥喇叭天线 CST 仿真</h3>
<p>该实验使用 CST 软件建立矩形波导馈电角锥喇叭天线的全波仿真模型。建模过程包括参数化设置、波导与喇叭口径面创建、Loft 侧壁生成及 Shell 掏空操作。仿真设置包括频率范围、open 边界条件、波导端口和远场监视器。模式分析确认工作频段内仅 TE10 模传输。仿真结果包括 S11 反射系数、VSWR 驻波比、10.3GHz 处 E 面与 H 面极坐标方向图，以及波导口和喇叭内部电场分布图。仿真增益与理论增益进行对比分析。</p>
<p><a href="/projects/resources/电磁场与电磁波实验/实验四、矩形波导馈电角锥喇叭天线CST仿真2026.pdf">查看矩形波导馈电角锥喇叭天线 CST 仿真讲义</a></p>
<p><a href="/projects/resources/电磁场与电磁波实验/胡东东+矩形波导馈电的角锥喇叭天线CST仿真.pdf">查看矩形波导馈电角锥喇叭天线 CST 仿真报告</a></p>

</section>

<section id="artificial-intelligence-experiment">
<h2>人工智能实验</h2>
<p>本报告集包含三个实验项目。实验一使用 A* 搜索算法求解八数码问题，设计两种启发式函数并对比搜索效率；实验二将井字棋从 3×3 扩展至 4×4 棋盘，实现带 Alpha-Beta 剪枝和深度限制的 Minimax 算法，并引入 Pie 规则平衡先手优势；实验三在 Fashion-MNIST 子集上分别实现朴素贝叶斯和 LeNet-5 卷积神经网络，通过超参数调优、训练过程可视化和消融实验对比两类方法的性能差异。</p>
<h3>实验一：环境配置及八数码问题</h3>
<p>该实验使用 A* 搜索算法求解 3×3 八数码问题，目标为将数字 1、2、3、4、6、7、8 移至正确位置。设计两种启发式函数：曼哈顿距离和错位数。程序支持随机生成可解初始状态和手动输入两种方式，输出移动步骤序列、每一步棋盘状态及总步数。实验记录与 AI 协作生成代码的过程，并对 A* 搜索中优先队列维护、g_score 更新、启发式函数可采纳性等核心逻辑进行代码注释。</p>
<p><a href="/projects/resources/人工智能实验/Lab1/3240102873-胡东东-实验1.pdf">查看环境配置及八数码问题实验报告</a></p>
<p><a href="/projects/resources/人工智能实验/Lab1/eight_puzzle.py">查看 eight_puzzle.py</a></p>
<h3>实验二：井字棋与对抗搜索</h3>
<p>该实验将 3×3 井字棋扩展为 4×4 棋盘，并实现深度受限的 Alpha-Beta 剪枝搜索。启发式评估函数基于每行/列/对角线的连续棋子数量评分。为平衡先手优势，引入 Pie 规则：随机决定先手，若 AI 先手则玩家可选择交换棋子，若玩家先手则由 AI 评估后决定是否交换。棋盘大小为 16 格，完整搜索树规模巨大，通过 Alpha-Beta 剪枝和最大深度限制将 AI 决策时间控制在可接受范围。程序采用命令行交互界面，包含输入校验和错误处理。</p>
<p><a href="/projects/resources/人工智能实验/Lab2/3240102873-胡东东-实验2.pdf">查看井字棋与对抗搜索实验报告</a></p>
<p><a href="/projects/resources/人工智能实验/Lab2/alpha_beta.py">查看 alpha_beta.py</a></p>
<h3>实验三：针对 Fashion-MNIST 子集的分类任务</h3>
<p>该实验在 Fashion-MNIST 五类别子集上完成图像分类任务，对比传统机器学习与深度学习方法。<br><strong>朴素贝叶斯部分：</strong>基线高斯 NB 在原始 784 维像素特征上准确率 70.95%。引入 PCA 降维，测试 k=10,50,100,200,500 五个维度，k=10 时准确率最高，高于原始特征。采用伯努利 NB 将像素二值化，阈值 64 时准确率 77.85%，优于高斯 NB。<br><strong>LeNet-5 部分：</strong>基线模型准确率 76.25%。通过控制变量法系统调优学习率、批大小、训练轮数、优化器和动量，最优组合准确率 90.75% 。训练过程可视化绘制损失曲线、准确率曲线及 Conv1/Conv2 特征图，展示卷积网络从边缘纹理到抽象语义的分层特征提取过程。<br><strong>算法改进与消融实验：</strong>引入数据增强、Dropout 和学习率衰减，在 15 轮训练下改进未带来提升；延长至 25 轮后组合模型准确率 88.80% ，虽略低于调优基线，但训练-测试准确率差距明显缩小，验证了正则化对泛化能力的提升作用。</p>
<p><a href="/projects/resources/人工智能实验/Lab3/3240102873-胡东东-实验3.pdf">查看针对 Fashion-MNIST 子集的分类任务实验报告</a></p>
<p><a href="/projects/resources/人工智能实验/Lab3/针对 Fashion-MNIST 子集的分类任务.zip">下载针对 Fashion-MNIST 子集的分类任务.zip</a></p>
<hr>
<h2>基于深度学习的 IMDB 影评情感分类</h2>
<p>该实验在 IMDB 影评数据集上构建并对比三种深度学习架构的情感二分类性能。预处理流程包括 HTML 标签去除、非字母字符过滤与小写转换、词频统计及序列填充，所有模型共用 8:2 划分的训练/验证集。<br><strong>TextCNN 部分：</strong>实现多尺寸卷积核的文本分类模型。系统化超参数实验覆盖嵌入维度、卷积核数量、卷积核组合、学习率和Dropout ，记录各组验证集最佳准确率与测试准确率，并保存训练曲线与混淆矩阵。最优组合测试准确率 84.7%。<br><strong>RNN 部分：</strong>分别实现单层 LSTM 、双向 LSTM 及引入 GloVe 预训练词向量的 BiLSTM。随机初始化模型测试准确率约 54%~55% ，训练曲线显示严重欠拟合；引入 GloVe 后准确率跃升至 81.1%，训练平稳收敛，混淆矩阵两端均衡。对比揭示了词向量质量对循环网络的决定性作用。<br><strong>DistilBERT 部分：</strong>使用 HuggingFace transformers 库加载 distilbert-base-uncased 预训练权重，全参数微调 2 个 epoch ，测试准确率 90.0% ，精确率/召回率/ F1 均为 0.90 ，收敛迅速且泛化良好。<br><strong>交互式 Demo 开发：</strong>基于 Gradio 搭建三模型实时对比预测界面，TextCNN 、BiLSTM+GloVe 和 DistilBERT 共用同一输入，以表格形式同步输出预测标签与置信度，并内置示例影评供快速体验。各模型的预测函数保持与训练阶段完全一致的预处理流程。</p>
<p><a href="/projects/resources/人工智能实验/IMDB情感分类/README.html">查看 README</a></p>
<p><a href="/projects/resources/人工智能实验/IMDB情感分类/基于深度学习的IMDB影评情感分类实验报告.pdf">查看 IMDB 情感分类实验报告</a></p>
<p><a href="/projects/resources/人工智能实验/IMDB情感分类/基于深度学习的IMDB影评情感分类.zip">下载基于深度学习的IMDB影评情感分类.zip</a></p>
</section>

<section id="info-electronic-engineering-intro-experiment">
<h2>信息与电子工程导论实验</h2>
<p>本报告集包含三个实验项目，分别使用 MATLAB、Simulink 和 Multisim 三种工具完成信号处理、通信调制与模拟电路仿真。实验一使用 MATLAB 对周期信号进行 FFT 频谱分析与 iFFT 重构，并研究随机噪声的频域滤波方法及采样参数对频谱的影响；实验二基于 Simulink 平台搭建非归零码、数字调制和模拟调制仿真模型，分析信号频率与采样率对调制结果的影响；实验三基于 Multisim 搭建共射极放大电路，完成静态工作点估算与仿真对比、输出特性曲线测试及电压放大倍数测量。</p>
<p><a href="/projects/resources/信息与电子工程导论实验/MATLAB入门.pdf">查看 MATLAB 安装教程与入门学习</a></p>
<h3>实验一：基于 MATLAB 的信号频谱分析</h3>
<p>该实验构建含三个频率分量的周期信号，使用 FFT 获取其频谱，再通过 iFFT 重构时域信号验证变换的可逆性。在周期信号基础上叠加均值为零、方差为 4 的白噪声，观察噪声在频谱中的分布特征，通过频域滤波抑制噪声后重构信号。实验还对比了采样频率从 1000Hz 降至 500Hz 、采样点数从 1500 减至 500 时频谱的变化，分析采样参数对频谱分辨率与幅值估计的影响。实验报告包含完整的 MATLAB 代码实现。</p>
<p><a href="/projects/resources/信息与电子工程导论实验/1-3240102873-胡东东.pdf">查看基于 MATLAB 的信号频谱分析报告</a></p>
<h3>实验二：基于 Simulink 的信号调制仿真</h3>
<p>该实验在 Simulink 中构建非归零码基带信号模型，观察其时域波形与频谱，并分析采样率对频谱的影响。建立 ASK、FSK、PSK 三种数字调制模型，以及 AM、FM 两种模拟调制模型，分别观察各调制方式的时域波形与频谱特征。实验通过调整信号频率和采样率，对比不同参数下 ASK 调制波形的变化，验证了采样率需满足奈奎斯特准则的基本要求。</p>
<p><a href="/projects/resources/信息与电子工程导论实验/2-3240102873-胡东东.pdf">查看基于 Simulink 的信号调制仿真报告</a></p>
<h3>实验三：基于 Multisim 的三极管特性仿真</h3>
<p>该实验在 Multisim 中搭建共射极放大电路，通过估算法计算静态工作点，并在电路中接入万用表进行仿真测量，对比理论估算值与仿真值的差异。使用虚拟 IV 测试仪测量三极管输出特性曲线簇，在曲线簇中标定静态工作点位置，观察其处于放大区中部，验证偏置设计的合理性。通过示波器观察输入输出波形，测量电压放大倍数，记录输入与输出波形相位相反的特性。</p>
<p><a href="/projects/resources/信息与电子工程导论实验/3-3240102873-胡东东.pdf">查看基于 Multisim 的三极管特性仿真报告</a></p>
</section>

<section id="yolo-image-detection">
<h2>YOLO图像检测</h2>
{% include_markdown "projects/resources/YOLO图像检测/README.md" %}
</section>

<section id="mcu-development">
<h2>KeilProject 工程模块总览</h2>
{% include_markdown "projects/resources/单片机开发/README.md" %}
<p><a href="https://github.com/JuzzanZimoe/Keil-Project">访问 Keil-Project GitHub 仓库</a></p>
</section>

</div>
</div>
