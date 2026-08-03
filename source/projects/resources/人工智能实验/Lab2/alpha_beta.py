import random

def print_board(board):
    print("-----------------")
    for i in range(4):
        print(f"| {board[i][0]} | {board[i][1]} | {board[i][2]} | {board[i][3]} |")
        print("-----------------")

def check_winner(board):
    # 检查行
    for i in range(4):
        if board[i][0] == board[i][1] == board[i][2] == board[i][3] != ' ':
            return board[i][0]
    # 检查列
    for i in range(4):
        if board[0][i] == board[1][i] == board[2][i] == board[3][i] != ' ':
            return board[0][i]
    # 检查对角线
    if board[0][0] == board[1][1] == board[2][2] == board[3][3] != ' ':
        return board[0][0]
    if board[0][3] == board[1][2] == board[2][1] == board[3][0] != ' ':
        return board[0][3]
    return None

def is_board_full(board):
    for i in range(4):
        for j in range(4):
            if board[i][j] == ' ':
                return False
    return True

def evaluate_line(line):
    o_count = line.count('O')
    x_count = line.count('X')
    if o_count == 4:
        return 100
    elif x_count == 4:
        return -100
    elif o_count == 3 and x_count == 0:
        return 10
    elif x_count == 3 and o_count == 0:
        return -10
    elif o_count == 2 and x_count == 0:
        return 1
    elif x_count == 2 and o_count == 0:
        return -1
    return 0

def evaluate(board):
    score = 0
    # 检查行
    for i in range(4):
        row = [board[i][j] for j in range(4)]
        score += evaluate_line(row)
    # 检查列
    for j in range(4):
        col = [board[i][j] for i in range(4)]
        score += evaluate_line(col)
    # 检查对角线
    diag1 = [board[i][i] for i in range(4)]
    score += evaluate_line(diag1)
    diag2 = [board[i][3-i] for i in range(4)]
    score += evaluate_line(diag2)
    return score

def minimax(board, is_maximizing, alpha, beta, depth, max_depth):
    # 终局判断
    winner = check_winner(board)
    if winner == 'O': 
        return 10
    elif winner == 'X': 
        return -10
    if is_board_full(board): 
        return 0
    # 深度限制检查：如果达到最大搜索深度，返回当前棋盘的评估分数
    if depth >= max_depth:
        return evaluate(board)  #不继续递归，直接评估当前棋盘状态
    # 否则继续进行Minimax搜索
    winner = check_winner(board)
    if winner == 'O': 
        return 10
    elif winner == 'X': 
        return -10
    if is_board_full(board): 
        return 0

    if is_maximizing:   # AI的回合，最大化自己的得分
        best_score = -float('inf')
        for i in range(4):
            for j in range(4):
                if board[i][j] == ' ':
                    board[i][j] = 'O'
                    # 递归调用，轮到玩家（Min节点），转递当前的alpha和beta值，并增加深度
                    score = minimax(board, False, alpha, beta, depth + 1, max_depth) 
                    board[i][j] = ' '
                    best_score = max(best_score, score)
                    alpha = max(alpha, best_score)  # 更新alpha值
                    if alpha >= beta:       # 如果alpha不小于beta，说明Min节点会避免这个分支，直接剪掉
                        break
            else:
                continue
            break
        return best_score
    else:   # 玩家回合，最小化AI的得分
        best_score = float('inf')
        for i in range(4):
            for j in range(4):
                if board[i][j] == ' ':
                    board[i][j] = 'X'
                    score = minimax(board, True, alpha, beta, depth + 1, max_depth)
                    board[i][j] = ' '
                    best_score = min(best_score, score) # 更新beta值
                    beta = min(beta, best_score)
                    if alpha >= beta:       # 如果alpha不小于beta，说明Max节点会避免这个分支，直接剪掉
                        break
            else:
                continue
            break
        return best_score

def get_best_move(board, max_depth):
    best_score = -float('inf')
    best_move = None
    for i in range(4):
        for j in range(4):
            if board[i][j] == ' ':
                board[i][j] = 'O'
                score = minimax(board, False, -float('inf'), float('inf'), 0, max_depth) 
                board[i][j] = ' '
                if score > best_score:
                    best_score = score
                    best_move = (i, j)
    return best_move

def ai_decide_swap(board, first_move, max_depth):
    # 玩家先手，当前棋盘上第一子为'X'
    # 不交换：AI继续执'O'，下一步由AI下，因此O先手于minimax
    score_no_swap = minimax(board, True, -float('inf'), float('inf'), 0, max_depth)

    # 交换：第一子变为'O'，该位置归AI所有，下一步由玩家下X，因此X先手于minimax
    board_swap = [row[:] for row in board]
    board_swap[first_move[0]][first_move[1]] = 'O'
    score_swap = minimax(board_swap, False, -float('inf'), float('inf'), 0, max_depth)

    return score_swap > score_no_swap

def main():
    board = [[' ' for _ in range(4)] for _ in range(4)]
    max_depth = 6  # 设置最大搜索深度
    player_first = random.choice([True, False])
    if player_first:
        print("你先手！你执 'X'，AI 执 'O'。")
        current_player = 'X'
    else:
        print("AI先手！AI 执 'O'，你执 'X'。")
        current_player = 'O'
    print_board(board)
    
    # 第一步
    first_move = None
    if player_first:
        # 玩家下第一步
        while True:
            try:
                row = int(input("请输入行号 (0, 1, 2, 3): "))
                col = int(input("请输入列号 (0, 1, 2, 3): "))
                if board[row][col] != ' ':
                    print("该位置已被占用，请重新输入！")
                    continue
                board[row][col] = 'X'
                first_move = (row, col)
                break
            except (ValueError, IndexError):
                print("输入无效，请输入 0-3 之间的数字！")
                continue
    else:
        # AI下第一步
        print("AI 正在思考第一步...")
        move = get_best_move(board, max_depth)
        board[move[0]][move[1]] = 'O'
        first_move = move
    
    print_board(board)
    
    # 询问交换
    if not player_first:  # AI先手，玩家是后手
        swap = input("第一子已落下，你是后手，是否交换？(y/n): ").lower()
        if swap == 'y':
            # 交换：第一子从'O'变成'X'，AI继续下第二步
            board[first_move[0]][first_move[1]] = 'X'
            next_player = 'O'
            print("已交换！第一子归你，AI继续下第二步。")
        else:
            next_player = 'X'  # 玩家下第二步
    else:  # 玩家先手，AI是后手
        print("AI正在决定是否交换...")
        swap = ai_decide_swap(board, first_move, max_depth)
        if swap:
            # 交换：第一子从'X'变成'O'，玩家变成后手，玩家下第二步
            board[first_move[0]][first_move[1]] = 'O'
            next_player = 'X'
            print("AI选择交换！第一子归AI，玩家下第二步。")
        else:
            next_player = 'O'  # AI下第二步
            print("AI选择不交换，继续按原顺序进行游戏。\n")
    
    # 现在开始正常游戏
    while True:
        current_player = next_player
        if current_player == 'X':
            # 玩家回合
            while True:
                try:
                    row = int(input("请输入行号 (0, 1, 2, 3): "))
                    col = int(input("请输入列号 (0, 1, 2, 3): "))
                    if board[row][col] != ' ':
                        print("该位置已被占用，请重新输入！")
                        continue
                    board[row][col] = 'X'
                    break
                except (ValueError, IndexError):
                    print("输入无效，请输入 0-3 之间的数字！")
                    continue
        else:
            # AI回合
            print("AI 正在思考...")
            move = get_best_move(board, max_depth)
            if move:
                board[move[0]][move[1]] = 'O'
        
        print_board(board)
        
        winner = check_winner(board)
        if winner == 'X':
            print("恭喜你，你赢了！")
            break
        if winner == 'O':
            print("很遗憾，AI 赢了！")
            break
        if is_board_full(board):
            print("平局！")
            break
        
        # 切换玩家
        next_player = 'O' if current_player == 'X' else 'X'

if __name__ == "__main__":
    main()