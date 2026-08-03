# 实验二：寻找并修复逻辑错误 

def print_board(board):
    print("-------------")
    for i in range(3):
        print(f"| {board[i][0]} | {board[i][1]} | {board[i][2]} |")
        print("-------------")

def check_winner(board):
    # 检查行
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] != ' ':
            return board[i][0]
    # 检查列
    for i in range(3):
        if board[0][i] == board[1][i] == board[2][i] != ' ':
            return board[0][i]
    # 检查对角线
    if board[0][0] == board[1][1] == board[2][2] != ' ':
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] != ' ':
        return board[0][2]
    return None

def is_board_full(board):
    for i in range(3):
        for j in range(3):
            if board[i][j] == ' ':
                return False
    return True

def minimax(board, is_maximizing):
    winner = check_winner(board)
    if winner == 'O': 
        return 10
    elif winner == 'X': 
        return -10
    if is_board_full(board): 
        return 0

    if is_maximizing:
        best_score = -float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == ' ':
                    board[i][j] = 'O'
                    score = minimax(board, False) 
                    board[i][j] = ' '
                    best_score = max(best_score, score)
        return best_score
    else:
        best_score = float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == ' ':
                    board[i][j] = 'X'
                    score = minimax(board, True)
                    board[i][j] = ' '
                    best_score = min(best_score, score)
        return best_score

def get_best_move(board):
    best_score = -float('inf')
    best_move = None
    for i in range(3):
        for j in range(3):
            if board[i][j] == ' ':
                board[i][j] = 'O'
                score = minimax(board, False) 
                board[i][j] = ' '
                if score > best_score:
                    best_score = score
                    best_move = (i, j)
    return best_move

def main():
    board = [[' ' for _ in range(3)] for _ in range(3)]
    print("欢迎来到 3x3 井字棋！你执 'X'，AI 执 'O'。")
    print_board(board)
    
    while True:
        # 玩家回合
        try:
            row = int(input("请输入行号 (0, 1, 2): "))
            col = int(input("请输入列号 (0, 1, 2): "))
            if board[row][col] != ' ':
                print("该位置已被占用，请重新输入！")
                continue
        except (ValueError, IndexError):
            print("输入无效，请输入 0-2 之间的数字！")
            continue
            
        board[row][col] = 'X'
        print_board(board)
        
        if check_winner(board) == 'X':
            print("恭喜你，你赢了！")
            break
        if is_board_full(board):
            print("平局！")
            break
            
        # AI回合
        print("AI 正在思考...")
        move = get_best_move(board)
        if move:
            board[move[0]][move[1]] = 'O'
        print_board(board)
        
        if check_winner(board) == 'O':
            print("很遗憾，AI 赢了！")
            break
        if is_board_full(board):
            print("平局！")
            break

if __name__ == "__main__":
    main()