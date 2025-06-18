// import React from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Code, Users, ShieldCheck } from "lucide-react";
// import { Swords, Brain, Trophy, Book } from 'lucide-react';
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// const HomePage = () => {


// 	const features = [
//   {
//     icon: Swords,
//     title: 'Battle Arena',
//     description: 'Challenge other coders in real-time PvP battles. Solve DSA problems head-to-head and climb the ranks.'
//   },
//   {
//     icon: Brain,
//     title: 'AI Voice Tutor',
//     description: 'Get personalized guidance from our AI tutor. Learn concepts, debug code, and master algorithms interactively.'
//   },
//   {
//     icon: Trophy,
//     title: 'Season Rankings',
//     description: 'Compete in seasonal tournaments, earn badges, and showcase your problem-solving prowess.'
//   },
//   {
//     icon: Book,
//     title: 'Problem Library',
//     description: 'Access a vast collection of curated DSA problems, from beginner-friendly to expert challenges.'
//   }
// ];

//   return (
//     <div className="bg-background text-foreground">
//       {/* Hero Section */}
//       <section className="container py-20 flex flex-col items-center text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
//           Master <span className="text-primary">DSA</span> with Real <span className="text-primary">Battles</span>
//         </h1>
//         <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
//           Sharpen your skills by solving problems, battling friends, and
//           climbing the leaderboard. Your journey to becoming a coding warrior
//           starts here.
//         </p>
//         <div className="mt-6 flex gap-4">
//           <Link to="/problems">
//             <Button size="lg" className="text-base text-foreground">
//               Start Solving
//             </Button>
//           </Link>
//           <Link to="/battle">
//             <Button size="lg" variant="outline" className="text-base">
//               Battle Mode
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Features Section */}
//      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold">
//             Level Up Your DSA Game
//           </h2>
//           <p className="mt-4 text-muted-foreground">
//             Everything you need to master algorithms and ace technical interviews
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <Card
//               key={index}
//               className="group relative bg-card backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary  transition-all"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
//               <div className="relative">
//                 <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <feature.icon className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>

//       {/* Final CTA */}
//       <section className="container py-20 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold">
//           Ready to prove your DSA skills?
//         </h2>
//         <p className="mt-4 text-muted-foreground">
//           Join DSA Battle and start competing today!
//         </p>
//         <div className="mt-6">
//           <Link to="/battle">
//             <Button size="lg" className="text-base text-foreground">
//               Start Battle
//             </Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;




import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Swords, Brain, Trophy, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Swords,
    title: 'Battle Arena',
    description: 'Challenge other coders in real-time PvP battles. Solve DSA problems head-to-head and climb the ranks.'
  },
  {
    icon: Brain,
    title: 'AI Voice Tutor',
    description: 'Get personalized guidance from our AI tutor. Learn concepts, debug code, and master algorithms interactively.'
  },
  {
    icon: Trophy,
    title: 'Season Rankings',
    description: 'Compete in seasonal tournaments, earn badges, and showcase your problem-solving prowess.'
  },
  {
    icon: Book,
    title: 'Problem Library',
    description: 'Access a vast collection of curated DSA problems, from beginner-friendly to expert challenges.'
  }
];

const HomePage = () => (
  <div className="bg-background text-foreground overflow-hidden px-2 ">
    {/* Hero Section */}
    <section className="container py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
      <div className="">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
          Master <span className="text-primary">DSA</span> with Real <span className="text-primary">Battles</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Sharpen your skills by solving problems, battling friends, and climbing the leaderboard. 
          Your journey to becoming a coding warrior starts here.
        </p>
        <div className="mt-8 flex flex-row gap-4 justify-center">
          <Link to="/problems" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-fit text-base px-8 py-6"
            >
              Start Solving
            </Button>
          </Link>
          <Link to="/battle" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              variant="secondary"
              className="w-fit text-base px-8 py-6 border border-primary  "
            >
              Battle Mode
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20  ">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Level Up Your DSA Game
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto ">
            Everything you need to master algorithms and ace technical interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all hover:border-primary duration-300 hover:shadow-lg h-full border-border"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="container py-20 text-center">
      <div className="bg-primary/5 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border border-border">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to prove your DSA skills?
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Join thousands of developers in the ultimate coding battle arena
        </p>
        <div className="mt-8">
          <Link to="/battle">
            <Button 
              size="lg" 
              className="text-base px-10 py-7"
            >
              Start Battle Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;