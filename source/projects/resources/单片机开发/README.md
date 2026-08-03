---
layout: false
---

本目录下的工程主要围绕 STM32F103 开发板、DDS 信号源、ADC/DAC、FFT/THD 测量、LCD 显示、触摸操作、串口调试等模块展开。下面按功能模块归类，工程名称按创建时间从新到旧排列，越久远的工程越靠后。

## 术语约定

本文按下面口径使用 ADC 名词：

- `双 ADC`：指 ADC1 和 ADC2 两个 ADC 外设一起采样，例如李萨如 X/Y 双通道。
- `单 ADC 单通道`：指只使用 ADC1 的一个输入通道。
- `单 ADC 多通道顺序采样`：指只使用 ADC1，但在 ADC1 规则序列里配置多个通道，通道按 Rank 前后依次采样。`Circuit_Tester` 和 `Circuit_Tester_FaultDiagnosis` 属于这一类，不属于双 ADC。

## 工程时间顺序

| 顺序 | 工程 | 主要用途 |
| --- | --- | --- |
| 1 | `WaveScope_Meter` | 综合波形显示、方波/THD 测量、李萨如显示、DDS、双 ADC、LCD 显示 |
| 2 | `Lissajous_Display_Tester` | 双 ADC 李萨如显示、LCD 绘图，无触摸操作 |
| 3 | `SquareWave_Duty_THD_Meter` | 方波占空比与 THD 测量、DDS、单 ADC、FFT、LCD 显示，无触摸操作 |
| 4 | `ESP8266 WiFi驱动程序` | ESP-015/ESP8266 Web 显示 THD 数据 |
| 5 | `AD9850&AD9851 DDS驱动程序` | AD9850/AD9851 点频输出驱动示例 |
| 6 | `Circuit_Tester_FaultDiagnosis` | 电路测试与故障诊断，DDS + 单 ADC 多通道顺序采样 + 继电器 + LCD/触摸 UI |
| 7 | `Circuit_Tester` | 电路输入/输出幅值测量，DDS + 单 ADC 多通道顺序采样 + 继电器 |
| 8 | `THD_Measurement` | 单 ADC 单通道 THD 测量 |
| 9 | `TouchScreen_General` | 旧版通用触摸屏模板 |
| 10 | `TouchScreen_VCA821` | 旧版触摸屏 VCA821 控制界面 |
| 11 | `VCA821_VoltageControl` | DAC/按键控制 VCA821 增益电压 |
| 12 | `SineWaveGenerator` | DAC + DMA + TIM6 正弦波输出 |
| 13 | `WaterLight_8LED` | 8 LED 流水灯和按键入门示例 |

## 模块分类

### DDS：AD9850 / AD9851

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | 使用 AD9851 作为参考/测试信号源，GPIO 模拟串行写 W_CLK、DATA、RESET、FQ_UD。 |
| `SquareWave_Duty_THD_Meter` | 使用 AD9851 输出方波/测试信号，配合 ADC 和 FFT 测占空比、THD。 |
| `AD9850&AD9851 DDS驱动程序` | 最基础的 DDS 点频驱动例程，包含 AD9850/AD9851 切换宏、LCD 显示和按键调频。 |
| `Circuit_Tester_FaultDiagnosis` | 使用 AD9851 产生诊断激励信号。 |
| `Circuit_Tester` | 使用 AD9851 产生测量激励信号。 |

### ADC / DMA 采样

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | 同时包含单 ADC 方波/THD 采样和 ADC1+ADC2 的 XY/李萨如采样。 |
| `Lissajous_Display_Tester` | 使用 ADC1 + ADC2 采集 X/Y 信号，属于双 ADC 用法。 |
| `SquareWave_Duty_THD_Meter` | 使用 ADC1 单通道 + DMA 采集方波波形。 |
| `Circuit_Tester_FaultDiagnosis` | 使用 ADC1 的 CH4/CH6 两个规则通道顺序采样，采集 `Ui` 和 `Uo`，属于单 ADC 多通道。 |
| `Circuit_Tester` | 使用 ADC1 的 CH4/CH6 两个规则通道顺序采样，采集 `Ui` 和 `Uo`，属于单 ADC 多通道。 |
| `THD_Measurement` | 使用 ADC1 单通道采集待测波形。 |

### 双 ADC / 李萨如

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | 集成李萨如显示、频率估算、相位估算和模式切换，是目前最完整的综合参考。 |
| `Lissajous_Display_Tester` | 专门用于李萨如显示，代码更集中，适合复用 LCD 绘图和双 ADC 采样框架。 |

### 单 ADC 多通道顺序采样

| 工程 | 使用情况 |
| --- | --- |
| `Circuit_Tester_FaultDiagnosis` | ADC1 Rank 1/2 分别采 PA4/Ui 与 PA6/Uo；两路不是同一瞬间采样，而是在 ADC1 序列内前后完成。 |
| `Circuit_Tester` | ADC1 Rank 1/2 分别采 PA4/Ui 与 PA6/Uo；适合输入/输出幅值、增益、阻抗等测量。 |

### FFT / THD / 方波测量

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | 综合了方波测量、THD 计算和 LCD 结果显示。 |
| `SquareWave_Duty_THD_Meter` | 方波占空比和 THD 测量的专用工程，参考价值很高；界面是 LCD 显示，触发依赖按键/EXTI，不使用触摸功能。 |
| `THD_Measurement` | 单通道 THD 测量基础工程，结构相对简单。 |
| `ESP8266 WiFi驱动程序` | 不做 FFT，本身负责接收并显示其他工程发来的 THD/波形数据。 |

### DAC / 模拟输出 / VCA821 控制

| 工程 | 使用情况 |
| --- | --- |
| `TouchScreen_VCA821` | 旧版触摸屏控制 VCA821 VG，包含电压到相对增益的 UI 显示逻辑。 |
| `VCA821_VoltageControl` | 使用 PA4/DAC_CH1 输出 VCA821 控制电压，PB6/PB7 按键增减。 |
| `SineWaveGenerator` | 使用 DAC_CH1 + DMA + TIM6 输出正弦波。 |

### LCD 显示 / 触摸操作 / 图形界面

特别说明：`SquareWave_Duty_THD_Meter` 和 `Lissajous_Display_Tester` 的参考价值主要在 LCD/FSMC 初始化、屏幕刷新和图形绘制上，它们没有使用触摸屏的触摸功能。`WaveScope_Meter` 也是 LCD 显示 + 按键模式切换。真正把触摸操作接入测量流程的工程是 `Circuit_Tester_FaultDiagnosis`，它在 `main.c` 中有 `TouchUi_Init()`、`TouchUi_Task()`、`MEASURE/DIAGNOSIS/CURVE/BACK` 等触摸页面逻辑。

两个 `TouchScreen_*` 工程属于较早的标准库触摸屏模板，复用时经常容易在校准、事件分发、LCD 初始化或工程文件包含路径上出错。因此它们更适合作为“旧接口和硬件接线说明”的参考，不建议直接作为新工程的首选代码来源。

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | LCD 显示方波结果、THD、李萨如图形和模式状态；不使用触摸功能。 |
| `Lissajous_Display_Tester` | LCD 绘制李萨如曲线，代码集中；不使用触摸功能。 |
| `SquareWave_Duty_THD_Meter` | LCD 显示方波占空比、THD7 和系统状态；不使用触摸功能。 |
| `Circuit_Tester_FaultDiagnosis` | 使用 LCD 显示测量/故障结果，并通过触摸按钮启动测量、诊断和曲线页面，是当前触摸操作更有参考价值的工程。 |
| `SineWaveGenerator` | 包含 `signal_lcd`、`signal_touch`、`signal_ui`，用于信号发生器 UI。 |
| `TouchScreen_General` | 旧版通用触摸屏模板，包含 ILI9341、XPT2046、Flash 校准保存、USART。 |
| `TouchScreen_VCA821` | 旧版触摸屏 VCA821 控制界面，适合看 UI 目标和电压换算，不建议直接复制底层。 |

### 串口调试 / 通信

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | USART1 调试输出。 |
| `SquareWave_Duty_THD_Meter` | USART1 调试输出。 |
| `ESP8266 WiFi驱动程序` | UART 接收测量帧并转为网页显示。 |
| `AD9850&AD9851 DDS驱动程序` | USART1 基础调试串口。 |
| `Circuit_Tester_FaultDiagnosis` | USART1 输出诊断日志和测量结果。 |
| `Circuit_Tester` | USART1 输出测量日志。 |
| `THD_Measurement` | USART1 输出 THD 测量结果。 |
| `TouchScreen_General` | USART1 printf 调试。 |
| `TouchScreen_VCA821` | USART1 输出 VCA821 控制状态。 |

### 按键 / LED / 基础 GPIO

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | K1/K2 用于模式/状态切换，另有多路控制 GPIO。 |
| `Lissajous_Display_Tester` | 使用 K1/EXTI0 启动采样显示。 |
| `SquareWave_Duty_THD_Meter` | 使用 K1/EXTI0 触发测量。 |
| `AD9850&AD9851 DDS驱动程序` | K1-K5 调频，LED1/LED2 状态指示。 |
| `VCA821_VoltageControl` | PB6/PB7 两个按键调节电压。 |
| `WaterLight_8LED` | 8 路 LED 和 PA4/PA5 两个按键，是最基础 GPIO 示例。 |
| `TouchScreen_General` | LED 状态指示。 |
| `TouchScreen_VCA821` | LED 状态指示。 |

### 继电器 / 外部测量通道控制

| 工程 | 使用情况 |
| --- | --- |
| `WaveScope_Meter` | 包含 `CTRL_RELAY`、`CTRL_PRESET0..3`、`CTRL_YSEL0/1` 等控制线。 |
| `Circuit_Tester_FaultDiagnosis` | 使用 `RELAY_RIN`、`RELAY_ROUT` 切换输入/输出测量路径。 |
| `Circuit_Tester` | 使用 `RELAY_RIN`、`RELAY_ROUT` 切换输入/输出测量路径。 |

### WiFi / Web 显示

| 工程 | 使用情况 |
| --- | --- |
| `ESP8266 WiFi驱动程序` | ESP-015/ESP8266 热点和网页显示，接收 UART JSON/`DATA:` 帧。 |

## 复用建议

- 做综合测量界面：优先看 `WaveScope_Meter`。
- 做方波占空比/THD：优先看 `SquareWave_Duty_THD_Meter`，注意它只有 LCD 显示，没有触摸输入。
- 做李萨如/双 ADC：优先看 `Lissajous_Display_Tester`，再看 `WaveScope_Meter`，注意它们是 LCD+按键/中断，不是触摸操作。
- 做单 ADC 多通道输入/输出测量：看 `Circuit_Tester` 和 `Circuit_Tester_FaultDiagnosis`。
- 做触摸屏测量界面：优先看 `Circuit_Tester_FaultDiagnosis` 的 `TouchUi_*` 代码；两个 `TouchScreen_*` 只建议作为旧模板和接线参考。
- 做单通道 THD：从 `THD_Measurement` 起步最清爽。
- 做 DDS 点频：先看 `AD9850&AD9851 DDS驱动程序`，再看测量工程里的 AD9851 移植版本。
- 做 VCA821 电压控制：按键版看 `VCA821_VoltageControl`，触摸 UI 目标看 `TouchScreen_VCA821`。
- 做入门 GPIO：看 `WaterLight_8LED`。
