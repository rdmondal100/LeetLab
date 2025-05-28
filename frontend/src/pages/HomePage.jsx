import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Users, ShieldCheck } from "lucide-react";
import {Card} from "@/components/ui/card"
const HomePage = () => {
	return (
		<div className="bg-background text-foreground">
			{/* Hero Section */}
			<section className="container py-20 flex flex-col items-center text-center">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					Master DSA with Real Battles
				</h1>
				<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
					Sharpen your skills by solving problems, battling friends, and climbing the leaderboard.
					Your journey to becoming a coding warrior starts here.
				</p>
				<div className="mt-6 flex gap-4">
					<Link to="/problems">
						<Button size="lg" className="text-base">
							Start Solving
						</Button>
					</Link>
					<Link to="/battle">
						<Button size="lg" variant="outline" className="text-base">
							Battle Mode
						</Button>
					</Link>
				</div>
			</section>

			{/* Features Section */}
		{/* Features Section */}
<section className=" py-16">
  <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card className="flex flex-col items-center p-6 text-center shadow-md">
      <Code className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-xl font-semibold">Quality Problems</h3>
      <p className="text-muted-foreground mt-2">
        Well-crafted DSA problems with detailed solutions for every level.
      </p>
    </Card>

    <Card className="flex flex-col items-center p-6 text-center shadow-md">
      <Users className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-xl font-semibold">Live Battles</h3>
      <p className="text-muted-foreground mt-2">
        Challenge friends or random users to head-to-head coding duels.
      </p>
    </Card>

    <Card className="flex flex-col items-center p-6 text-center shadow-md">
      <ShieldCheck className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-xl font-semibold">Fair Rankings</h3>
      <p className="text-muted-foreground mt-2">
        Transparent and dynamic leaderboard based on your performance.
      </p>
    </Card>
  </div>
</section>


			{/* Final CTA */}
			<section className="container py-20 text-center">
				<h2 className="text-3xl md:text-4xl font-bold">
					Ready to prove your DSA skills?
				</h2>
				<p className="mt-4 text-muted-foreground">
					Join DSA Battle and start competing today!
				</p>
				<div className="mt-6">
					<Link to="/battle">
						<Button size="lg" className="text-base">
							Start Battle
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
