


export const sampledpData =   {
  title: "Merge Two Sorted Arrays",
  description: "Given two sorted arrays, return a merged sorted array containing all elements.",
  difficulty: "EASY",
  tags: ["Array", "Two Pointers"],
  examples: [
    { input: "3\n1 3 5\n4\n2 4 6 7", output: "1 2 3 4 5 6 7", explanation: "Merged and sorted." }
  ],
  constraints: "0 <= n,m <= 10^5",
  hints: "Use two pointers and merge in O(n+m).",
  editorial: "Standard merge step as in merge sort, move smaller pointer and append.",
  testcases: [
    { input: "3\n1 3 5\n4\n2 4 6 7", output: "1 2 3 4 5 6 7" },
    { input: "0\n\n3\n1 2 3", output: "1 2 3" }
  ],
  codeSnippet: {
    JAVASCRIPT: `
function mergeSorted(a, b) {
  // your solution goes here
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");
let inputData = "";
process.stdin.on("data", chunk => inputData += chunk);
process.stdin.on("end", () => {
  const lines = inputData.trim().split("\\n");
  const n = parseInt(lines[0] || "0",10);
  const a = n ? lines[1].split(" ").map(Number) : [];
  const offset = n ? 2 : 1;
  const m = parseInt(lines[offset],10);
  const b = m ? lines[offset+1].split(" ").map(Number) : [];
  console.log(mergeSorted(a,b).join(" "));
});
    `,
    PYTHON: `
class Solution:
    def mergeSorted(self, a, b):
        # your solution goes here
        pass

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().strip().splitlines()
    idx = 0
    n = int(data[idx]); idx+=1
    a = list(map(int, data[idx].split())) if n>0 else []; idx += 1 if n>0 else 0
    m = int(data[idx]); idx +=1
    b = list(map(int, data[idx].split())) if m>0 else []
    print(" ".join(map(str, Solution().mergeSorted(a,b))))
    `,
    CPP: `
#include <bits/stdc++.h>
using namespace std;
vector<long long> mergeSorted(vector<long long>& a, vector<long long>& b) {
    // your solution goes here
    return {};
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i=0;i<n;i++) cin >> a[i];
    int m; cin >> m;
    vector<long long> b(m);
    for (int i=0;i<m;i++) cin >> b[i];
    auto res = mergeSorted(a,b);
    for (auto &x : res) cout << x << " ";
    return 0;
}
    `
  },
  referenceSolution: {
    JAVASCRIPT: `
function mergeSorted(a, b) {
  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }
  while (i < a.length) res.push(a[i++]);
  while (j < b.length) res.push(b[j++]);
  return res;
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");
let inputData = "";
process.stdin.on("data", chunk => inputData += chunk);
process.stdin.on("end", () => {
  const lines = inputData.trim().split("\\n");
  const n = parseInt(lines[0] || "0",10);
  const a = n ? lines[1].split(" ").map(Number) : [];
  const offset = n ? 2 : 1;
  const m = parseInt(lines[offset],10);
  const b = m ? lines[offset+1].split(" ").map(Number) : [];
  console.log(mergeSorted(a,b).join(" "));
});
    `,
    PYTHON: `
class Solution:
    def mergeSorted(self, a, b):
        i, j = 0, 0
        res = []
        while i < len(a) and j < len(b):
            if a[i] <= b[j]:
                res.append(a[i]); i+=1
            else:
                res.append(b[j]); j+=1
        res.extend(a[i:]); res.extend(b[j:])
        return res

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().strip().splitlines()
    idx = 0
    n = int(data[idx]); idx+=1
    a = list(map(int, data[idx].split())) if n>0 else []; idx += 1 if n>0 else 0
    m = int(data[idx]); idx +=1
    b = list(map(int, data[idx].split())) if m>0 else []
    print(" ".join(map(str, Solution().mergeSorted(a,b))))
    `,
    CPP: `
#include <bits/stdc++.h>
using namespace std;
vector<long long> mergeSorted(vector<long long>& a, vector<long long>& b) {
    vector<long long> res;
    int i=0,j=0;
    while (i<a.size() && j<b.size()) {
        if (a[i] <= b[j]) res.push_back(a[i++]);
        else res.push_back(b[j++]);
    }
    while (i<a.size()) res.push_back(a[i++]);
    while (j<b.size()) res.push_back(b[j++]);
    return res;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i=0;i<n;i++) cin >> a[i];
    int m; cin >> m;
    vector<long long> b(m);
    for (int i=0;i<m;i++) cin >> b[i];
    auto res = mergeSorted(a,b);
    for (auto &x : res) cout << x << " ";
    return 0;
}
    `
  }
};
 



export const sampleStringProblem = {
  title: "Binary Search (Exists)",
  description: "Given a sorted array of integers and a target, return 'YES' if target exists, otherwise 'NO'.",
  difficulty: "EASY",
  tags: ["Binary Search", "Array"],
  examples: [
    { input: "5\n1 2 3 4 5\n3", output: "YES", explanation: "3 is in the array." }
  ],
  constraints: "1 <= n <= 10^5, -10^9 <= nums[i], target <= 10^9",
  hints: "Binary search in O(log n).",
  editorial: "Standard binary search to find presence of target.",
  testcases: [
    { input: "5\n1 2 3 4 5\n3", output: "YES" },
    { input: "3\n1 2 4\n3", output: "NO" }
  ],
  codeSnippet: {
    JAVASCRIPT: `
function existsInSorted(nums, target) {
  // your solution goes here
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");
let inputData = "";
process.stdin.on("data", chunk => inputData += chunk);
process.stdin.on("end", () => {
  const lines = inputData.trim().split("\\n");
  const n = parseInt(lines[0],10);
  const nums = lines[1].split(" ").map(Number);
  const target = parseInt(lines[2],10);
  console.log(existsInSorted(nums, target) ? "YES" : "NO");
});
    `,
    PYTHON: `
class Solution:
    def existsInSorted(self, nums, target):
        # your solution goes here
        pass

if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    target = int(input())
    print("YES" if Solution().existsInSorted(nums, target) else "NO")
    `,
    CPP: `
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool existsInSorted(vector<long long>& nums, long long target) {
        // your solution goes here
        return false;
    }
};

int main() {
    int n; cin >> n;
    vector<long long> nums(n);
    for (int i=0;i<n;i++) cin >> nums[i];
    long long target; cin >> target;
    Solution sol; cout << (sol.existsInSorted(nums, target) ? "YES" : "NO");
    return 0;
}
    `
  },
  referenceSolution: {
    JAVASCRIPT: `
function existsInSorted(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return true;
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return false;
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");
let inputData = "";
process.stdin.on("data", chunk => inputData += chunk);
process.stdin.on("end", () => {
  const lines = inputData.trim().split("\\n");
  const n = parseInt(lines[0],10);
  const nums = lines[1].split(" ").map(Number);
  const target = parseInt(lines[2],10);
  console.log(existsInSorted(nums, target) ? "YES" : "NO");
});
    `,
    PYTHON: `
class Solution:
    def existsInSorted(self, nums, target):
        l, r = 0, len(nums)-1
        while l <= r:
            m = (l + r) // 2
            if nums[m] == target: return True
            if nums[m] < target: l = m + 1
            else: r = m - 1
        return False

if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    target = int(input())
    print("YES" if Solution().existsInSorted(nums, target) else "NO")
    `,
    CPP: `
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool existsInSorted(vector<long long>& nums, long long target) {
        int l = 0, r = nums.size()-1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (nums[m] == target) return true;
            if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return false;
    }
};

int main() {
    int n; cin >> n;
    vector<long long> nums(n);
    for (int i=0;i<n;i++) cin >> nums[i];
    long long target; cin >> target;
    Solution sol; cout << (sol.existsInSorted(nums, target) ? "YES" : "NO");
    return 0;
}
    `
  }
};