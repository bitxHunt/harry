import Bootcamp from "@/assets/Bootcamp.jpeg";
import NSC from "@/assets/NSC.jpeg";

export function FoundingClub() {
  return (
    <div>
      <h2>Where the idea started</h2>

      <p>
        In my first year, I participated in a five-day iOS development bootcamp
        jointly organized by Singapore Polytechnic and SUTD. The program
        introduced students to Swift and Xcode, guiding us through the process
        of designing and building an iOS application from scratch. Through
        hands-on development, mentorship, and collaboration with other students,
        I experienced how powerful mobile applications could be in solving
        everyday problems and how exciting it was to build them. The bootcamp
        sparked my interest in iOS development and inspired me to continue
        exploring the Apple development ecosystem beyond the program.
      </p>

      <p>
        Instead of learning alone, I wanted to create a space where students
        could learn together. This idea eventually became the foundation for the
        iOS Development Club at Singapore Polytechnic.
      </p>

      <h2>Building the club from scratch</h2>

      <p>
        Starting a new club required more than just technical interest. I had to
        prepare proposals, define the structure of the club, and work closely
        with lecturers and Apple mentors to ensure the initiative was
        sustainable. Together with a small founding team, we established the
        club's guidelines, departments, and learning roadmap.
      </p>

      <p>
        Our goal was simple: create a community where students could explore iOS
        development, collaborate on ideas, and gain exposure to real-world
        development practices.
      </p>

      <h2>The first bootcamp</h2>

      <img
        src={Bootcamp}
        alt="Students attending the iOS development bootcamp"
        className="rounded-xl border border-neutral-200 dark:border-white/10 my-6 shadow-sm"
      />

      <p>
        One of our biggest milestones was organizing a five-day iOS bootcamp.
        Students learned the fundamentals of Swift programming, user interface
        design, and mobile application development. By the end of the program,
        participants built their own iOS applications and pitched their ideas at
        Apple’s headquarters.
      </p>

      <p>
        Watching students transform from beginners into confident builders was
        one of the most rewarding parts of the experience.
      </p>

      <h2>Growing a developer community</h2>

      <img
        src={NSC}
        alt="Networking event with student developers"
        className="rounded-xl border border-neutral-200 dark:border-white/10 my-6 shadow-sm"
      />

      <p>
        Beyond technical workshops, we focused on building a developer
        community. Through networking events with the iOS Dev Scout community,
        we connected students with mentors, developers, and student leaders
        across different polytechnics.
      </p>

      <p>
        These conversations often led to discussions about development tools,
        project ideas, and career paths in technology. Over time, many members
        from the first batch returned as student mentors to guide newer
        participants in workshops.
      </p>

      <h2>National Software Competition 2025</h2>

      <p>
        The club later organized the National Software Competition 2025, where
        secondary school students developed meaningful iOS applications themed
        around SG60. The event brought together students, mentors, and judges
        from Apple and the industry to showcase creative and impactful ideas.
      </p>

      <a
        href="https://www.sp.edu.sg/courses/schools/sma/happenings/detail/soc-happenings/national-software-competition-(nsc)-2025"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-indigo-500 dark:text-indigo-300 hover:underline"
      >
        Read the official article from Singapore Polytechnic →
      </a>

      <h2>What I learned</h2>

      <p>
        Founding the club taught me that building technology is only part of the
        journey. Building communities around technology can be even more
        impactful. When people share ideas, collaborate, and learn from one
        another, innovation happens naturally.
      </p>

      <p>
        I believe technology is not just as a tool for building applications,
        but as a way to connect people and empower communities to create
        meaningful solutions together.
      </p>
    </div>
  );
}
