import { ChartColumnIncreasing, Database, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function MainPageDatabase() {
  return (
    <section className="mt-12 mb-9 py-8 px-6  rounded-lg shadow-lg bg-secondary">
      <h2 className="text-3xl font-bold text-center mb-6 ">
        Track Your Climbing Journey
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <div className="text-4xl mb-3 flex justify-center">
            <Database />
          </div>
          <h3 className="text-xl font-semibold mb-2">Extensive Database</h3>
          <p className="">
            Access thousands of climbing routes from around the world
          </p>
          <div className="text-center mt-4">
            <Link href="/database">
              <Button
                variant="outline"
                className="cursor-pointer hover:underline"
              >
                View Database
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-3 flex justify-center">
            <ChartColumnIncreasing />
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Your Sends</h3>
          <p className="">
            Log your climbs and monitor your progress over time
          </p>
          <div className="text-center mt-4">
            <Link href="/account/signup">
              <Button className="cursor-pointer hover:underline">
                Sign Up to Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-3 flex justify-center">
            <Star />
          </div>
          <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
          <p className="">Create your personal wishlist of climbs to conquer</p>
          <div className="text-center mt-4">
            <Link href="/account/signup">
              <Button className="cursor-pointer hover:underline">
                Sign Up to Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
