import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed w-full bg-neutral-100 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <Link href="/">
            <Image
              src="/sweet_cuts.png"
              alt="Sweet Cuts"
              width={80}
              height={80}
              className="rounded-full border-4 border-neutral-900 hover:border-navy-400 transition-colors"
            />
          </Link>

          <div className="flex space-x-4">
            <Link href="/auth/login" className="px-4 py-2">
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 btn-primary rounded-md"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
