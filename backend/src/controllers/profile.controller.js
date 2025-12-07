import { db } from "../libs/db.js";
import { subDays, startOfDay } from "date-fns";

// @desc   Get user profile
// @route  GET /api/profile
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Prisma uses `id`, not `_id`
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get user statistics
// @route  GET /api/profile/stats
// @access Private
 export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // --- 1. Total problems solved (all-time) ---
    const solvedProblems = await db.problemSolved.findMany({
      where: { userId },
      select: { problemId: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    const totalSolved = solvedProblems.length;

    // --- 2. Total submissions ---
    const totalSubmissions = await db.submission.count({ where: { userId } });

    const acceptanceRate =
      totalSubmissions > 0
        ? ((totalSolved / totalSubmissions) * 100).toFixed(1) + "%"
        : "0%";

    // --- 3. Current streak calculation (count unique days only) ---
    const solvedDaysSet = new Set(
      solvedProblems.map((s) =>
        startOfDay(new Date(s.createdAt)).toISOString().slice(0, 10)
      )
    );

    let streak = 0;
    let cursor = startOfDay(new Date());
    const cursorIsoDate = () => cursor.toISOString().slice(0, 10);

    while (solvedDaysSet.has(cursorIsoDate())) {
      streak += 1;
      cursor = subDays(cursor, 1);
    }

    // --- 4. Global rank based on past 30 days (strict unique ranks) ---
    const periodStart = subDays(new Date(), 30);

    // Step 1: Count number of solves in last 30 days per user
    const usersWithSolvedCounts = await db.problemSolved.groupBy({
      by: ["userId"],
      _count: { problemId: true },
      where: { createdAt: { gte: periodStart } },
    });

    // Step 2: Get each user's most recent solve date for tie-breaking
    const recentSolves = await db.problemSolved.findMany({
      where: { createdAt: { gte: periodStart } },
      select: { userId: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    const latestSolveMap = {};
    for (const s of recentSolves) {
      if (!latestSolveMap[s.userId]) latestSolveMap[s.userId] = s.createdAt;
    }

    // Step 3: Build array with count and latest solve date
    const counts = usersWithSolvedCounts.map((u) => ({
      userId: u.userId,
      count: Number(u._count.problemId) || 0,
      latest: latestSolveMap[u.userId] || new Date(0),
    }));

    // Step 4: Sort by count desc, then latest solve desc (recent = better rank)
    counts.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return new Date(b.latest) - new Date(a.latest); // tie-breaker: more recent solve = higher rank
    });

    // Step 5: Assign unique ranks (no ties)
    const rankMap = {};
    for (let i = 0; i < counts.length; i++) {
      rankMap[counts[i].userId] = i + 1;
    }

    // Step 6: Determine user's rank
    const rank = rankMap[userId] ?? counts.length + 1;

    // --- Final response ---
    res.status(200).json({
      success: true,
      stats: {
        solved: totalSolved,
        acceptance: acceptanceRate,
        streak,
        rank,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update user profile
// @route  PUT /api/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, image } = req.body;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { name, image },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
