# Amity Afterclass

## Product & UI Design Brief

**Working tagline:** Beyond the classroom.\
**Product:** A campus-wide community and discovery platform for Amity
University Kolkata\
**Status:** Concept / MVP design\
**Audience:** Students, club leaders, event organizers, and approved
campus administrators

------------------------------------------------------------------------

## 1. Product vision

Amity Afterclass brings the student life of Amity University Kolkata
into one easy-to-use digital space.

Students should not need to search through multiple WhatsApp groups,
Instagram accounts, posters, and notice boards to find out what is
happening on campus. They should be able to discover events, follow
clubs, find opportunities, and keep up with relevant campus
announcements from one place.

**Core promise:** Everything happening around campus, in one place.

### Product principles

-   **Discoverable:** Important events and opportunities are easy to
    find.
-   **Community-led:** Verified clubs and organizers can publish updates
    themselves.
-   **Trustworthy:** Official notices, verified club posts, and
    student-submitted content are clearly distinguished.
-   **Useful first:** Prioritize timely information over endless
    scrolling.
-   **Mobile-first:** The experience should work especially well on
    phones.

------------------------------------------------------------------------

## 2. Target users

### Students

-   Discover upcoming events, workshops, fests, competitions, and
    activities.
-   Follow clubs and receive relevant updates.
-   Find internships, auditions, volunteering roles, and recruitment
    openings.
-   Save events and track registration deadlines.

### Club leaders and organizers

-   Manage a club profile.
-   Publish announcements and opportunities.
-   Create and update events.
-   View registrations and basic engagement metrics.

### Campus administrators

-   Review and verify club accounts.
-   Publish official notices.
-   Moderate reported content.
-   Manage platform-wide categories and permissions.

------------------------------------------------------------------------

## 3. Information architecture

### Primary navigation

1.  **Home** --- campus feed and personalized highlights.
2.  **Events** --- upcoming events, calendar, and event details.
3.  **Clubs** --- club directory, club pages, and club updates.
4.  **Opportunities** --- internships, auditions, volunteering,
    competitions, and openings.
5.  **Notices** --- important academic and administrative announcements.
6.  **Profile** --- saved items, followed clubs, and account settings.

On desktop, use a left sidebar. On mobile, use a compact bottom
navigation with the most-used destinations: Home, Events, Clubs,
Opportunities, and Profile. Notices can also appear as a prominent feed
category.

------------------------------------------------------------------------

## 4. Core screens

### A. Home dashboard

**Purpose:** Answer "What's happening at Amity today?" immediately.

Recommended layout: - Top bar with wordmark, search, notifications, and
profile. - Welcome line: "What's happening after class?" - Featured
event card. - Horizontal "This week" event strip. - Quick filters:
Events, Clubs, Opportunities, Notices. - Latest campus updates feed. -
"Popular clubs" and "Closing soon" opportunity sections.

Feed cards should show: - Publisher or club name and verification
status. - Post category. - Short title and description. - Date/time when
relevant. - Venue or online format when relevant. - Save and share
actions. - Clear registration or details link when applicable.

### B. Events

Include: - List and calendar views. - Filters for date, category, club,
and event format. - Event cards with title, date, time, venue, host, and
registration status. - Event detail page with description, organizer,
schedule, eligibility, registration deadline, and registration link. -
Save event and add-to-calendar actions.

Event states: - Upcoming - Registration open - Filling fast (only when
supported by real registration data) - Registration closed - Completed -
Cancelled

### C. Clubs

Create a directory with categories such as: - Music - Dance and
performing arts - Photography and media - Coding and technology -
Entrepreneurship - Cultural activities - Sports and fitness - Social
impact and volunteering

Each club page should include: - Club name, logo, and cover image. -
Short description and areas of interest. - Verified leader or
administrator. - Follow button. - Upcoming events. - Recruitment status
and openings. - Announcements and media gallery. - Contact or official
social links, if provided.

### D. Opportunities

Use clear categories: - Internships - Placements and career events -
Club recruitment - Auditions - Volunteering - Competitions and
hackathons - Campus ambassador roles - Scholarships and programs

Each listing should include the source, eligibility, location or format,
deadline, and application link. Mark expired opportunities clearly and
avoid presenting unverified listings as official.

### E. Notices

Separate notices by source: - Official university / administration -
Department - Verified club - Student community

Official notices should have a distinct visual treatment and source
label. Only authorized administrators should be able to publish content
under the official university label.

### F. Club leader dashboard

Core actions: - Create an event. - Publish an announcement. - Add an
opportunity. - Edit club profile. - Manage registrations. - View post
and event performance.

Keep the dashboard simple. A leader should be able to publish a basic
event in a few steps.

------------------------------------------------------------------------

## 5. MVP scope

Build the smallest useful version before adding social-network
complexity.

### Must have

-   Student sign-up and login.
-   College affiliation verification.
-   Home feed.
-   Event listing and event detail pages.
-   Club directory and club profiles.
-   Verified club leader accounts.
-   Event and announcement publishing.
-   Opportunities listing.
-   Follow clubs and save events.
-   Basic admin review and reporting tools.
-   Responsive mobile and desktop layouts.

### Later releases

-   Comments and reactions.
-   Student-to-student messaging.
-   Personalized recommendations.
-   Event check-in and QR attendance.
-   Advanced analytics.
-   Native mobile applications.
-   Multi-college support.

**Do not make likes, comments, or messaging a launch dependency.** First
prove that students and club leaders consistently use the platform to
publish and discover useful information.

------------------------------------------------------------------------

## 6. Visual direction

### Brand personality

-   Energetic, welcoming, youthful, and organized.
-   More like a modern community product than a university
    administration portal.
-   Editorial and confident, with enough warmth to feel student-led.

### Suggested palette

  Token     Hex         Usage
  --------- ----------- --------------------------------
  Ink       `#171923`   Main text and dark surfaces
  Paper     `#F7F7F5`   Main page background
  White     `#FFFFFF`   Cards and content surfaces
  Violet    `#7865D8`   Primary brand accent
  Coral     `#FF806B`   Highlights and calls to action
  Muted     `#777985`   Secondary text
  Border    `#E7E7E5`   Dividers and card borders
  Success   `#27845B`   Confirmed positive states

Use the palette consistently. Keep most surfaces neutral; reserve accent
colors for actions, selected navigation, and meaningful highlights.

### Typography

-   Use a clean sans-serif such as **Inter**, **Geist**, or **Manrope**.
-   Use bold, compact headings.
-   Keep body text highly readable.
-   Use consistent spacing and avoid overly decorative type.

### UI style

-   Rounded cards with restrained shadows or subtle borders.
-   Strong event photography and club imagery.
-   Clear date and deadline labels.
-   Compact filters and readable chips.
-   Consistent icons with text labels for important actions.
-   Avoid excessive gradients, glass effects, and decorative clutter.

------------------------------------------------------------------------

## 7. Homepage wireframe

``` text
┌─────────────────────────────────────────────────────────────┐
│ AFTERCLASS.             Search campus...      Alerts  Profile│
├───────────────┬─────────────────────────────────────────────┤
│ Home          │ What's happening after class?               │
│ Events        │ Discover events, clubs and opportunities.   │
│ Clubs         │                                             │
│ Opportunities│ ┌──────────────── Featured event ──────────┐ │
│ Notices       │ │ Event image                              │ │
│               │ │ Campus Fest · Fri, 4:00 PM               │ │
│               │ │ Explore event                 [Details]  │ │
│               │ └──────────────────────────────────────────┘ │
│               │                                             │
│               │ THIS WEEK                                   │
│               │ [Event card] [Event card] [Event card]      │
│               │                                             │
│               │ CAMPUS FEED                                 │
│               │ [Verified club announcement]                │
│               │ [Opportunity listing]                       │
│               │ [Official campus notice]                    │
│               │                                             │
│               │ POPULAR CLUBS                               │
│               │ [Music] [Coding] [Photography] [Dance]      │
└───────────────┴─────────────────────────────────────────────┘
```

This is a structural guide, not a final visual specification. On mobile,
stack the content into a single column and use bottom navigation.

------------------------------------------------------------------------

## 8. Content and trust rules

-   Verify club leaders before granting publishing permissions.
-   Keep official university notices visually and permission-wise
    separate from community posts.
-   Display who published each item and when it was published.
-   Give users a way to report misleading, abusive, or outdated content.
-   Provide moderation and takedown workflows.
-   Require organizers to maintain accurate event dates, venues, and
    registration links.
-   Automatically mark expired listings as expired; do not silently
    delete useful history.
-   Collect only the student information needed to operate the service.
-   Publish clear privacy, community, and advertising policies.

Do not use university logos, official branding, or language implying
university endorsement without permission. "Amity Afterclass" is a
working concept name; confirm naming, trademark, domain, and
institutional permissions before launch.

------------------------------------------------------------------------

## 9. Monetization approach

Keep core discovery free for students. Monetize optional promotion
rather than access to essential campus information.

Potential revenue streams: 1. Clearly labelled local business
sponsorships. 2. Sponsored event placements. 3. Paid promotional slots
for eligible organizers. 4. Partnerships with student-focused services.
5. Optional event-management tools for organizers.

Advertising principles: - Clearly label paid placements. - Do not
disguise ads as official notices. - Avoid intrusive pop-ups and
excessive ad density. - Do not make revenue projections until real
traffic and engagement data exist. - Check Google AdSense eligibility
and policies before implementation.

A sensible launch sequence is to build an engaged audience first, then
test limited sponsorships and advertising.

------------------------------------------------------------------------

## 10. Suggested technical architecture

  Layer            Suggested choice
  ---------------- --------------------------------------
  Frontend         Next.js + TypeScript
  Styling          Tailwind CSS
  UI components    Accessible reusable component system
  Backend          Supabase
  Database         PostgreSQL
  Authentication   Supabase Auth with verified email
  File storage     Supabase Storage
  Notifications    Email first; web push later
  Hosting          Vercel
  Analytics        Privacy-conscious product analytics

### Core data entities

-   `users`
-   `student_profiles`
-   `clubs`
-   `club_memberships`
-   `club_roles`
-   `events`
-   `event_registrations`
-   `posts`
-   `opportunities`
-   `notices`
-   `follows`
-   `saved_items`
-   `reports`
-   `sponsorships`

Use role-based access control. Students can browse and interact;
verified club leaders can manage only their clubs; authorized
administrators can verify accounts and manage official notices.

------------------------------------------------------------------------

## 11. Success metrics

Measure whether the product is genuinely reducing the effort required to
find campus information.

### Early indicators

-   Number of verified clubs onboarded.
-   Number of active club publishers each week.
-   Events and opportunities published per week.
-   Student weekly active users.
-   Event detail views and registration-link clicks.
-   Number of students following at least one club.
-   Repeat visits and notification engagement.
-   Reports, stale listings, and moderation response time.

A useful initial validation target is to onboard 5--10 active clubs and
observe whether students return weekly to discover new information.
Treat this as an experiment, not a guaranteed growth benchmark.

------------------------------------------------------------------------

## 12. Launch plan

### Phase 1 --- Validate

-   Interview students from different departments and years.
-   Speak with club leaders and event organizers.
-   Identify where current event and opportunity information is
    published.
-   Confirm what information students struggle to find.

### Phase 2 --- Build

-   Create the responsive student experience.
-   Build event, club, and opportunity publishing.
-   Add account verification and moderation.
-   Seed the platform with accurate upcoming information.

### Phase 3 --- Pilot

-   Invite a small group of club leaders.
-   Test with students across different departments.
-   Gather feedback on discovery, accuracy, and usability.
-   Fix publishing friction before adding social features.

### Phase 4 --- Grow

-   Expand to more clubs and departments.
-   Introduce weekly campus digests.
-   Explore partnerships and clearly labelled sponsorships.
-   Consider multi-campus support only after the first campus model
    works.

------------------------------------------------------------------------

## 13. Product positioning

**Product name:** Amity Afterclass\
**Short name:** Afterclass\
**Tagline:** Beyond the classroom.\
**Descriptor:** The campus community and discovery platform for Amity
University Kolkata.

### Short product description

Amity Afterclass brings campus life together in one place. Discover
upcoming events, explore student clubs, find opportunities, and stay
updated with what's happening around campus --- without jumping between
multiple groups and pages.

### Brand message

**Life doesn't end after lectures.**

The best parts of campus happen beyond the classroom: the events, the
people, the clubs, the opportunities, and the moments you don't want to
miss.

------------------------------------------------------------------------

## 14. Immediate next steps

1.  Validate the name and permissions before public launch.
2.  Interview 5 students and 5 club leaders.
3.  Confirm the first three launch modules: Home, Events, and Clubs.
4.  Create high-fidelity desktop and mobile screens.
5.  Build a working pilot with verified club publishing.
6.  Measure repeat usage before expanding scope or adding ads.

**Design north star:** When a student opens Afterclass, they should know
what's happening, what they can join, and what they might otherwise have
missed.
