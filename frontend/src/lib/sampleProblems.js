


export const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Demo"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    { input: "1", output: "1" },
    { input: "2", output: "2" },
    { input: "3", output: "3" },
    { input: "4", output: "5" },
  ],
  examples: [
 {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
{
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
{
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  ],
  codeSnippet: {
    JAVASCRIPT: `
function climbStairs(n) {
  if (n <= 2) return n;

  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// Input parsing and execution
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const n = parseInt(input.trim());
  if (!isNaN(n)) {
    console.log(climbStairs(n));
  }
});
    `,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      if n <= 2:
          return n
      a, b = 1, 2
      for _ in range(3, n + 1):
          a, b = b, a + b
      return b`,
    CPP: `#include <iostream>
using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; ++i) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
};`,
  },
  referenceSolution: {
    JAVASCRIPT: `
function climbStairs(n) {
  if (n <= 2) return n;

  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// Input parsing and execution
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const n = parseInt(input.trim());
  if (!isNaN(n)) {
    console.log(climbStairs(n));
  }
});
    `,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      if n <= 2:
          return n
      a, b = 1, 2
      for _ in range(3, n + 1):
          a, b = b, a + b
      return b`,
    CPP: `#include <iostream>
using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; ++i) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
};`,
  },
};




// export const sampleStringProblem = {
//   title: "Valid Palindrome",
//   description:
//     "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
//   difficulty: "EASY",
//   tags: ["String", "Two Pointers","Demo"],
//   constraints:
//     "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
//   hints:
//     "Consider using two pointers, one from the start and one from the end, moving towards the center.",
//   editorial:
//     "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
//   testcases: [
//     {
//       input: "A man, a plan, a canal: Panama",
//       output: "true",
//     },
//     {
//       input: "race a car",
//       output: "false",
//     },
//     {
//       input: " ",
//       output: "true",
//     },
//   ],
//   examples: [
//     {
//       input: 's = "A man, a plan, a canal: Panama"',
//       output: "true",
//       explanation: '"amanaplanacanalpanama" is a palindrome.',
//     },

//     {
//       input: 's = "Riday"',
//       output: "true",
//       explanation: '"yadiR" is a palindrome.',
//     },
//   ],
//   codeSnippet:  {
//     JAVASCRIPT: `/**
//  * @param {string} s
//  * @return {boolean}
//  */
// function isPalindrome(s) {
//   s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
//   let left = 0, right = s.length - 1;
//   while (left < right) {
//     if (s[left] !== s[right]) return false;
//     left++;
//     right--;
//   }
//   return true;
// }

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

// rl.on('line', (line) => {
//   const result = isPalindrome(line);
//   console.log(result ? "true" : "false");
//   rl.close();
// });`,
//     PYTHON: `class Solution:
//   def isPalindrome(self, s: str) -> bool:
//       filtered = [c.lower() for c in s if c.isalnum()]
//       return filtered == filtered[::-1]

// if __name__ == "__main__":
//   import sys
//   s = sys.stdin.readline().strip()
//   sol = Solution()
//   result = sol.isPalindrome(s)
//   print(str(result).lower())`,
//     CPP: `#include <iostream>
// #include <string>
// #include <cctype>
// using namespace std;

// bool isPalindrome(string s) {
//     string filtered;
//     for (char c : s) {
//         if (isalnum(c)) filtered += tolower(c);
//     }

//     int left = 0, right = filtered.size() - 1;
//     while (left < right) {
//         if (filtered[left++] != filtered[right--]) return false;
//     }
//     return true;
// }

// int main() {
//     string s;
//     getline(cin, s);
//     cout << (isPalindrome(s) ? "true" : "false") << endl;
//     return 0;
// }`,
//   },
//   referenceSolution: {
//     JAVASCRIPT: `/**
//  * @param {string} s
//  * @return {boolean}
//  */
// function isPalindrome(s) {
//   s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
//   let left = 0, right = s.length - 1;
//   while (left < right) {
//     if (s[left] !== s[right]) return false;
//     left++;
//     right--;
//   }
//   return true;
// }

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

// rl.on('line', (line) => {
//   const result = isPalindrome(line);
//   console.log(result ? "true" : "false");
//   rl.close();
// });`,
//     PYTHON: `class Solution:
//   def isPalindrome(self, s: str) -> bool:
//       filtered = [c.lower() for c in s if c.isalnum()]
//       return filtered == filtered[::-1]

// if __name__ == "__main__":
//   import sys
//   s = sys.stdin.readline().strip()
//   sol = Solution()
//   result = sol.isPalindrome(s)
//   print(str(result).lower())`,
//     CPP: `#include <iostream>
// #include <string>
// #include <cctype>
// using namespace std;

// bool isPalindrome(string s) {
//     string filtered;
//     for (char c : s) {
//         if (isalnum(c)) filtered += tolower(c);
//     }

//     int left = 0, right = filtered.size() - 1;
//     while (left < right) {
//         if (filtered[left++] != filtered[right--]) return false;
//     }
//     return true;
// }

// int main() {
//     string s;
//     getline(cin, s);
//     cout << (isPalindrome(s) ? "true" : "false") << endl;
//     return 0;
// }`,
//   },
// };





export const sampleStringProblem =  {
  "title": "Merge k Sorted Lists",
  "category": "linked list",
  "description": "You are given an array of k linked-lists lists, each linked list is sorted in ascending order. Merge all the linked lists into one sorted linked list and return it.",
  "difficulty": "HARD",
  "tags": ["Linked List", "Heap", "Divide and Conquer", "Amazon", "Google", "Microsoft"],
  "constraints": "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4\nlists[i] is sorted in ascending order.\nThe sum of lists[i].length won't exceed 10^4.",
  "hints": [
    "Use a priority queue (min-heap) to keep track of the smallest current nodes of each list.",
    "Alternatively, use divide and conquer to merge pairs of lists.",
    "Be careful with null or empty lists."
  ],
  "editorial": "We can use a min-heap to always extract the smallest current node among the heads of all lists. Insert the extracted node into the result list and then push its next node into the heap. Alternatively, merge lists two at a time using divide and conquer to reduce complexity.",
  "testcases": [
    { "input": "lists = [[1,4,5],[1,3,4],[2,6]]", "output": "[1,1,2,3,4,4,5,6]" },
    { "input": "lists = []", "output": "[]" },
    { "input": "lists = [[]]", "output": "[]" }
  ],
  "examples": [
    {
      "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
      "output": "[1,1,2,3,4,4,5,6]",
      "explanation": "Merging the lists results in one sorted list."
    }
  ],
  "codeSnippet": {
    "JAVASCRIPT": `
function ListNode(val = 0, next = null) {
  this.val = val;
  this.next = next;
}

function mergeKLists(lists) {
  // Write your code here
}

/* Input parsing and execution */
function main() {
  const input = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
  const lists = input.lists;

  function arrayToList(arr) {
    let dummy = new ListNode();
    let current = dummy;
    for (let val of arr) {
      current.next = new ListNode(val);
      current = current.next;
    }
    return dummy.next;
  }

  function listToArray(node) {
    let arr = [];
    while (node) {
      arr.push(node.val);
      node = node.next;
    }
    return arr;
  }

  const linkedLists = lists.map(arrayToList);
  const merged = mergeKLists(linkedLists);
  console.log(JSON.stringify(listToArray(merged)));
}
main();
    `,
    "PYTHON": `
class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

class Solution:
  def mergeKLists(self, lists):
      # Write your code here
      pass

def arrayToList(arr):
  dummy = ListNode()
  current = dummy
  for val in arr:
      current.next = ListNode(val)
      current = current.next
  return dummy.next

def listToArray(node):
  arr = []
  while node:
      arr.append(node.val)
      node = node.next
  return arr

if __name__ == "__main__":
  import sys, json
  data = json.loads(sys.stdin.read())
  lists = [arrayToList(lst) for lst in data['lists']]
  sol = Solution()
  res = sol.mergeKLists(lists)
  print(json.dumps(listToArray(res)))
    `,
    "CPP": `
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
  int val;
  ListNode* next;
  ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* arrayToList(const vector<int>& arr) {
  ListNode dummy(0);
  ListNode* current = &dummy;
  for (int val : arr) {
    current->next = new ListNode(val);
    current = current->next;
  }
  return dummy.next;
}

vector<int> listToArray(ListNode* node) {
  vector<int> arr;
  while (node != nullptr) {
    arr.push_back(node->val);
    node = node->next;
  }
  return arr;
}

struct compare {
  bool operator()(ListNode* a, ListNode* b) {
    return a->val > b->val;
  }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
  // Write your code here
  return nullptr;
}

int main() {
  int k;
  cin >> k;
  vector<vector<int>> lists(k);
  for (int i = 0; i < k; i++) {
    int n; cin >> n;
    lists[i].resize(n);
    for (int j = 0; j < n; j++) {
      cin >> lists[i][j];
    }
  }

  vector<ListNode*> linkedLists;
  for (auto& v : lists) linkedLists.push_back(arrayToList(v));

  ListNode* merged = mergeKLists(linkedLists);
  vector<int> result = listToArray(merged);
  for (int x : result) cout << x << " ";
  cout << endl;
  return 0;
}
    `
  },
  "referenceSolution": {
    "JAVASCRIPT": `
function mergeKLists(lists) {
  const minHeap = new MinPriorityQueue({ priority: node => node.val });
  for (const node of lists) {
    if (node) minHeap.enqueue(node);
  }

  let dummy = new ListNode(0);
  let current = dummy;

  while (!minHeap.isEmpty()) {
    const node = minHeap.dequeue().element;
    current.next = node;
    current = current.next;
    if (node.next) minHeap.enqueue(node.next);
  }

  return dummy.next;
}
    `,
    "PYTHON": `
import heapq

class Solution:
  def mergeKLists(self, lists):
      min_heap = []
      for node in lists:
          if node:
              heapq.heappush(min_heap, (node.val, node))

      dummy = ListNode()
      current = dummy

      while min_heap:
          val, node = heapq.heappop(min_heap)
          current.next = node
          current = current.next
          if node.next:
              heapq.heappush(min_heap, (node.next.val, node.next))

      return dummy.next
    `,
    "CPP": `
#include <queue>

struct compare {
  bool operator()(ListNode* a, ListNode* b) {
    return a->val > b->val;
  }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
  priority_queue<ListNode*, vector<ListNode*>, compare> minHeap;

  for (auto node : lists) {
    if (node) minHeap.push(node);
  }

  ListNode dummy(0);
  ListNode* current = &dummy;

  while (!minHeap.empty()) {
    ListNode* node = minHeap.top();
    minHeap.pop();
    current->next = node;
    current = current->next;
    if (node->next) minHeap.push(node->next);
  }

  return dummy.next;
}
    `
  }
}
