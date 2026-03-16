import Calvary from "@/assets/Calvary.jpeg";
import Planning from "@/assets/Planning.jpeg";
import Award from "@/assets/LEO_Award.jpeg";

export function BriskWalkPage() {
  return (
    <div>
      <h2>Creating meaningful experiences for seniors</h2>

      <p>
        Volunteering with senior citizens through the SP LEO Club introduced me
        to the concept of active ageing — the idea that staying socially and
        physically active plays an important role in maintaining wellbeing later
        in life.
      </p>

      <p>
        One of the initiatives I helped organize was a series of brisk walk
        events for seniors from community partners such as Calvary Community
        Care and Chin Swee-Hong Lim Nursing Home.
      </p>

      <h2>Planning the experience</h2>

      <img
        src={Planning}
        alt="Station games and activities during the brisk walk event"
        className="rounded-xl border border-neutral-200 dark:border-white/10 my-6 shadow-sm"
      />

      <p>
        Organizing these events required careful planning. We mapped walking
        routes through nature parks, ensuring there were wheelchair-accessible
        paths, resting stations, and sheltered areas along the way. Volunteers
        were paired with seniors so that everyone had someone to walk and talk
        with throughout the journey.
      </p>

      <p>
        To make the experience more engaging, we also introduced small station
        games and group activities along the route. These stops allowed seniors
        to take breaks, interact with volunteers, and enjoy lighthearted moments
        together while staying active.
      </p>

      <h2>Moments that mattered</h2>

      <img
        src={Calvary}
        alt="Group photo of volunteers and seniors"
        className="rounded-xl border border-neutral-200 dark:border-white/10 my-6 shadow-sm"
      />

      <p>
        What made these events meaningful was seeing familiar faces return each
        time. Many seniors gradually opened up to share stories about their
        lives, their hobbies, and even suggestions for future activities.
      </p>

      <p>
        Something as simple as walking together, spotting wildlife in the park,
        or taking group photos created moments of connection that meant a lot to
        them.
      </p>

      <h2>Recognition and reflection</h2>

      <img
        src={Award}
        alt="Receiving the Excellence Award for volunteer service"
        className="rounded-xl border border-neutral-200 dark:border-white/10 my-6 shadow-sm"
      />

      <p>
        The volunteering journey later culminated in receiving the Excellence
        Award in recognition of our contributions and dedication to community
        service. While the award was a meaningful milestone, what mattered more
        were the experiences and relationships built through the activities.
      </p>

      <p>
        These experiences reminded me that meaningful impact does not always
        require complex solutions. Sometimes it comes from creating spaces where
        people feel heard, included, and connected. Volunteering strengthened my
        belief that empathy and community are just as important as technical
        skills in shaping a positive society.
      </p>
    </div>
  );
}
