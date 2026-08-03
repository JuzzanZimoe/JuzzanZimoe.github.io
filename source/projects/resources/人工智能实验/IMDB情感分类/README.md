## IMDB 影评情感分类实验

### 虚拟环境与依赖
- 环境名称：nlp_project
- Python 版本：3.10
- 主要依赖包（可通过以下命令安装）：
  conda create -n nlp_project python=3.10 -y
  conda activate nlp_project
  pip install torch pandas matplotlib scikit-learn tqdm nltk beautifulsoup4 transformers datasets gradio seaborn accelerate

### 项目文件说明
| 文件名 | 功能 |
|--------|------|
| preprocess.py | 数据预处理、词表构建、DataLoader 生成 |
| step1_check.py | 环境测试与数据清洗示例 |
| train_textcnn.py | TextCNN 基础训练（导入 preprocess 变量） |
| textcnn_experiment.py | TextCNN 超参数实验（支持命令行参数） |
| train_lstm.py | 单层 LSTM 训练 |
| train_bilstm.py | BiLSTM（随机词向量）训练 |
| train_bilstm_glove.py | BiLSTM + GloVe 预训练词向量训练 |
| train_distilbert.py | DistilBERT 微调训练 |
| gradio_app.py | Gradio 交互式界面，加载 TextCNN、BiLSTM+GloVe、DistilBERT 进行实时预测 |

### 运行说明
1. 请将 `question2_train.csv` 和 `question2_test.csv` 放在与本文件相同的目录下。
2. 运行 `step1_check.py` 可验证环境、数据加载与清洗是否正常。
3. 训练 TextCNN 可直接运行 `train_textcnn.py`（需先运行 `preprocess.py` 生成中间变量），或者独立使用 `textcnn_experiment.py`。
   示例：python textcnn_experiment.py --exp_name mytest --embedding_dim 100 --lr 0.001
4. 分别运行 `train_lstm.py`, `train_bilstm.py`, `train_bilstm_glove.py`, `train_distilbert.py` 可得到各模型的训练结果。
   注意：`train_bilstm_glove.py` 需要下载 GloVe 词向量文件 glove.6B.100d.txt 并放在同一目录下。
   `train_distilbert.py` 已设置镜像，可自动下载预训练模型。
5. 启动 Gradio 演示界面：
   python gradio_app.py
   界面将在本地 7860 端口运行，浏览器打开 http://127.0.0.1:7860 即可交互。
   演示前请确保已生成模型权重文件：textcnn_best.pth, bilstm_glove.pth, 以及 ./results/checkpoint-2500（DistilBERT 训练后自动保存）。

### 注意事项
- 所有实验仅使用 CPU 完成，无需 GPU。