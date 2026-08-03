import heapq
import sys
import random

GOAL = (1, 2, 3,
        4, 5, 6,
        7, 8, 0)

MOVES = {
    "U": -3,
    "D": 3,
    "L": -1,
    "R": 1,
}

NEIGHBORS = {
    0: ("D", "R"),
    1: ("D", "L", "R"),
    2: ("D", "L"),
    3: ("U", "D", "R"),
    4: ("U", "D", "L", "R"),
    5: ("U", "D", "L"),
    6: ("U", "R"),
    7: ("U", "L", "R"),
    8: ("U", "L"),
}


def heuristic_manhattan(state):
    # 曼哈顿距离：忽略数字5和0
    dist = 0
    for idx, v in enumerate(state):
        if v == 0 or v == 5:
            continue
        goal_idx = GOAL.index(v)
        dist += abs((idx // 3) - (goal_idx // 3)) + abs((idx % 3) - (goal_idx % 3))
    return dist


def heuristic_misplaced(state):
    # 错位数：计算1/2/3/4/6/7/8中不在正确位置的数量
    count = 0
    for idx, v in enumerate(state):
        if v in (1, 2, 3, 4, 6, 7, 8) and GOAL[idx] != v:
            count += 1
    return count


def is_goal(state):
    # 只检查 1/2/3/4/6/7/8 是否处于 GOAL 对应位置
    for idx, v in enumerate(state):
        if v in (1, 2, 3, 4, 6, 7, 8) and GOAL[idx] != v:
            return False
    return True


def neighbors(state):
    z = state.index(0)
    for dir in NEIGHBORS[z]:
        ni = z + MOVES[dir]
        # 水平边界检查
        if dir == "L" and z % 3 == 0:
            continue
        if dir == "R" and z % 3 == 2:
            continue
        new_state = list(state)
        new_state[z], new_state[ni] = new_state[ni], new_state[z]
        yield tuple(new_state), dir

# 接收初始状态start和所使用的启发式函数，返回从起点到目标的移动序列字符串，若无解返回None
def a_star(start, heuristic_func):
    # 初始化优先队列，元素格式：(f, g, 状态, 路径)
    # f = g + h，其中g是从起点到当前状态的实际步数，h是启发式函数值（估计从当前状态到目标状态的距离）
    open_heap = []
    heapq.heappush(open_heap, (heuristic_func(start), 0, start, ""))  # (f, g, state, path)
    # came_from 记录每个状态的前驱和移动方向，可用于后续回溯完整路径
    came_from = {start: ("", None)}
    # g_score 记录从起点到每个状态的最短步数
    g_score = {start: 0}

    while open_heap:
        # 弹出当前 f 值最小的节点（最有希望的节点）
        f, g, current, path = heapq.heappop(open_heap)
        # 检查是否到达目标状态
        if is_goal(current):
            return path
        # 遍历所有可能的移动
        for nxt, move in neighbors(current):
            # 从起点到邻居的候选步数
            tentative_g = g + 1
            # 如果找到了更短路径，则更新并加入优先队列
            if tentative_g < g_score.get(nxt, 1_000_000):  # 使用一个大数表示无穷大
                g_score[nxt] = tentative_g
                came_from[nxt] = (move, current)
                # 启发式函数估计当前状态到目标的距离，其可采纳性保证了A的最优性
                h = heuristic_func(nxt)     # 计算启发式值
                heapq.heappush(open_heap, (tentative_g + h, tentative_g, nxt, path + move))
    # 无解
    return None


def print_state(state, step):
    print(f"Step {step}:")
    for i in range(3):
        print(" ".join(str(x) for x in state[i*3:(i+1)*3]))
    print()


def apply_move(state, move):
    z = state.index(0)
    ni = z + MOVES[move]
    new_state = list(state)
    new_state[z], new_state[ni] = new_state[ni], new_state[z]
    return tuple(new_state)


def random_solvable():
    # 生成一个可解状态
    while True:
        perm = list(range(9))
        random.shuffle(perm)
        inv = sum(1 for i in range(9) for j in range(i + 1, 9) if perm[i] and perm[j] and perm[i] > perm[j])
        if inv % 2 == 0:
            return tuple(perm)


def is_valid_state(state):
    # 检查是否为9个数字，0-8各一次
    if len(state) != 9:
        return False
    nums = set()
    for num in state:
        if not (0 <= num <= 8) or num in nums:
            return False
        nums.add(num)
    return True


def get_manual_start():
    print("请输入初始状态：9个数字（0-8），用空格分隔，表示3x3棋盘的状态（0表示空格）。")
    print("例如：1 2 3 4 5 6 7 8 0")
    while True:
        try:
            inp = input("输入：").strip()
            nums = [int(x) for x in inp.split()]
            if is_valid_state(nums):
                return tuple(nums)
            else:
                print("输入无效：请确保9个数字，0-8各一次。")
        except ValueError:
            print("输入无效：请确保输入数字。")


def solve_and_print(start, heuristic_func, heuristic_name):
    print(f"\n使用启发式函数：{heuristic_name}")
    path = a_star(start, heuristic_func)
    if path is None:
        print("未找到解")
        return

    print("移动步骤:", path)
    print("步数:", len(path))
    print()

    state = start
    print_state(state, 0)
    for i, move in enumerate(path, 1):
        state = apply_move(state, move)
        print_state(state, i)


def main():
    choice = input("是否手动输入初始状态？(y/n): ").strip().lower()
    if choice == 'y':
        start = get_manual_start()
    else:
        start = random_solvable()
        print("随机初始状态:", start)

    # 使用曼哈顿距离启发式
    solve_and_print(start, heuristic_manhattan, "曼哈顿距离")

    # 使用错位数启发式
    solve_and_print(start, heuristic_misplaced, "错位数")


if __name__ == "__main__":
    main()