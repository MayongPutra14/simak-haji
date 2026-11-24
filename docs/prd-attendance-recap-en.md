# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# CONGREGATION ATTENDANCE RECAP FEATURE

**Status:** Final -- Ready for Implementation\
**Platform:** SIMAK -- Silaturahmi Haji Mandiri Karawang\
**Frontend:** React JS + Vite\
**Styling:** Tailwind CSS v4\
**Language:** JavaScript

------------------------------------------------------------------------

# 1. PROJECT OVERVIEW

## 1.1 Background

The Attendance feature is part of the SIMAK system and is used to
record, monitor, and present congregation attendance information for
each activity or event.

The previous attendance system focused on the QR Code scanning process.
The next stage of development requires a recap page so that Admins and
Leaders can view congregation attendance rates, see lists of attendees
and absentees, and review the event history of an individual congregant.

This feature must be integrated into the existing SIMAK application
structure without adding clutter to the main navigation.

## 1.2 Objectives

1.  Provide an attendance recap page based on events.
2.  Make it easier for Admins and Leaders to monitor the number of
    congregants who attend and are absent.
3.  Provide participant details for each event.
4.  Provide information about events that an individual congregant has
    attended.
5.  Allow congregants to view their own attendance history.
6.  Provide a responsive interface for desktop and mobile devices.

## 1.3 Design Principles

The system uses two main perspectives:

-   **Event-oriented:** Displays congregation attendance information
    based on events.
-   **Individual-oriented:** Displays the events that an individual
    congregant has attended.

Both perspectives use the same attendance data source.

**Important limitation:** This feature must not create a new
Congregation Data page because the application already has a dedicated
Congregation Data menu for managing congregants' identities, addresses,
and documents.

------------------------------------------------------------------------

# 2. USER ROLES & PERMISSIONS

The system has three user roles.

  -----------------------------------------------------------------------
  Role                                Permissions
  ----------------------------------- -----------------------------------
  Admin                               Can view all attendance recaps
                                      across all regions.

  Leader                              Can view attendance recaps limited
                                      to their leadership region.

  Congregant                          Can view their own attendance
                                      statistics and history.
  -----------------------------------------------------------------------

## 2.1 Admin

Admins have permission to:

-   View all event recaps.
-   View overall attendance statistics.
-   View the attendance details of each event.
-   View lists of congregants who are present and absent.
-   View an individual congregant's event history.
-   Search and apply filters as needed.

## 2.2 Leader

Leaders have the same functions as Admins, but their data is restricted
to their leadership region.

Requirements:

-   Cannot view data from other regions.
-   Does not need a region filter.
-   Statistics and tables must only count congregants within the region
    under their responsibility.

Regional restrictions must be enforced when retrieving data, not merely
by hiding information on the frontend.

## 2.3 Congregant

Congregants can only:

-   View their own total attendance.
-   View their own total absences.
-   View their own attendance percentage.
-   View the event history they have attended, as well as their absence
    status.

Congregants must not be able to access other congregants' attendance
information.

------------------------------------------------------------------------

# 3. NAVIGATION & ROUTING

## 3.1 Navigation Principles

The application already has primary navigation consisting of a sidebar
on desktop and a bottom navbar on mobile.

Both are already sufficiently populated, so the Attendance feature must
not add a new submenu to either navigation component.

The Attendance menu is already available in the application's main menu
grid.

When a user clicks the Attendance menu:

-   Admins and Leaders are directed straight to the Attendance Recap
    page.
-   Congregants are directed straight to the My Attendance page.

There is no need to create an intermediary page containing submenu
options.

## 3.2 Navigation Structure

``` text
MAIN MENU
│
├── ADMIN / LEADER
│   │
│   └── ATTENDANCE
│       │
│       └── ATTENDANCE RECAP
│           │
│           ├── Attendance Statistics
│           ├── Filters and Search
│           ├── Event Recap List
│           │
│           ├── EVENT DETAILS
│           │   ├── Participant Statistics
│           │   └── Congregant List
│           │
│           └── CONGREGANT HISTORY
│               └── List of Events Attended
│
└── CONGREGANT
    │
    └── MY ATTENDANCE
        ├── Attendance Statistics
        └── Attendance History
```

**Note:** Congregant History is not a new congregant listing menu. This
page contains an individual's attendance details and must be integrated
with the existing Congregation Data navigation.

## 3.3 Frontend Routes

Use the following route structure:

  Page                 Route
  -------------------- -------------------------------------
  Attendance Recap     `/absensi/rekap-kehadiran`
  Event Details        `/absensi/rekap-kehadiran/:eventId`
  Congregant History   `/absensi/riwayat-jamaah/:userId`
  My Attendance        `/absensi-saya`

Requirements:

1.  Admins and Leaders use the Attendance Recap page as their main page.
2.  Congregants are directed straight to My Attendance.
3.  Detail pages must not display navigation tabs.
4.  Each detail page must have a back button.
5.  Event Details must return to Attendance Recap.
6.  Congregant History must return to the originating page or the
    existing Congregation Data page, depending on its navigation
    integration.

These routes are for frontend routing, not REST API endpoints.

------------------------------------------------------------------------

# 4. FUNCTIONAL REQUIREMENTS

# 4.1 ATTENDANCE RECAP PAGE

**Users:** Admin and Leader.

**Purpose:** Provide an overview of congregation attendance activity
based on events that have been completed.

## A. Page Header

Display:

-   A button to return to the main menu page.
-   Page title: Attendance Recap.
-   Short description: Monitor and manage congregation attendance recaps
    for each activity.

There is no need to add a Congregation Data tab.

## B. Attendance Statistics

Display four statistic cards.

  Statistic         Description
  ----------------- ----------------------------------------------
  Total Events      Number of events that have been completed.
  Total Present     Cumulative number of congregant attendances.
  Total Absent      Cumulative number of congregant absences.
  Attendance Rate   Overall attendance percentage.

Example:

    Total Events   Total Present   Total Absent   Attendance
  -------------- --------------- -------------- ------------
              12             450            150          75%

Calculation:

Attendance Rate = (Total Present / (Total Present + Total Absent)) ×
100%

Requirements:

-   Only completed events are included in the calculation.
-   Upcoming events are excluded.
-   Events that are currently in progress (Live) are excluded.
-   Admin statistics cover all regions.
-   Leader statistics cover only their leadership region.

## C. Filters and Search

Provide:

1.  Search by event name.
2.  Date-range filter.
3.  Event-status filter, if needed.

For Leaders, there is no need to provide a region filter.

## D. Event Recap Table

Display a table with the following columns:

  Column       Description
  ------------ -------------------------------------------
  No.          Sequential number.
  Event Name   Name of the activity.
  Date         Event date.
  Present      Number of congregants who attended.
  Absent       Number of congregants who did not attend.
  Percentage   Event attendance rate.
  Action       Details button.

Sample data:

  No.   Event Name                 Date             Present   Absent   Percentage
  ----- -------------------------- -------------- --------- -------- ------------
  1     Hajj Study Session 1       Jan 11, 2026          40       10          80%
  2     Hajj Ritual Training       Jan 15, 2026          35       15          70%
  3     Hajj Preparation Session   Jan 20, 2026          45        5          90%

When the Details button is clicked, the user is directed to the Event
Details page.

------------------------------------------------------------------------

# 4.2 EVENT DETAILS PAGE

**Users:** Admin and Leader.

**Purpose:** Display congregation attendance information for a specific
event.

This page is focused on event participants, not on general congregant
information.

## A. Header

Display:

-   Back button.
-   Event name.
-   Event date.
-   Event time.

There is no need to display Attendance navigation tabs.

## B. Participant Statistics

Display a summary of statistics in several small cards.

  -----------------------------------------------------------------------
  Statistic                           Description
  ----------------------------------- -----------------------------------
  Total Congregants                   Number of congregants included in
                                      the event's scope.

  Total Present                       Number of congregants who
                                      successfully completed attendance
                                      check-in.

  Total Absent                        Number of congregants who did not
                                      complete attendance check-in.

  Percentage                          Event attendance rate.
  -----------------------------------------------------------------------

## C. Congregant List

Display a list of all congregants included in the event's scope.

  Column            Description
  ----------------- ----------------------------------------------------
  No.               Sequential number.
  Congregant Name   Full name of the congregant.
  Region            The congregant's region when the event took place.
  Check-in Time     Time when the congregant scanned the QR Code.
  Status            Present or Absent.

Example:

  No.   Congregant Name   Region   Check-in Time   Status
  ----- ----------------- -------- --------------- ---------
  1     Ahmad             A        08:05           Present
  2     Budi              A        \-              Absent
  3     Candra            B        08:15           Present

## D. Status Filter

Provide the following filters:

-   All.
-   Present.
-   Absent.

The filter is used to narrow down the congregant list based on
attendance status.

## E. Congregant History Details

A congregant's name can provide access to their individual event
history.

When a congregant's name is clicked, the system can open the Congregant
History page.

This page only displays information about events that the congregant has
attended, rather than duplicating their profile and document
information.

------------------------------------------------------------------------

# 4.3 CONGREGANT HISTORY PAGE

**Users:** Admin and Leader.

**Purpose:** Display the events that an individual congregant has
attended.

This is not a new Congregation Data page and is not intended for
managing congregant identities.

## A. Congregant Information

Display only enough identity information to identify the congregant,
such as their full name and region.

Do not recreate sections for managing documents, home addresses,
registration numbers, or other profile information because these are
already available in the Congregation Data menu.

## B. Event History

Display a list of events that the congregant has attended.

  Column          Description
  --------------- ------------------------------------
  No.             Sequential number.
  Event Name      Name of the activity attended.
  Date            Event date.
  Check-in Time   Time when the QR Code was scanned.
  Status          Attendance status.

Example:

  No.   Event                      Date           Check-in Time   Status
  ----- -------------------------- -------------- --------------- ---------
  1     Hajj Study Session 1       Jan 11, 2026   08:05           Present
  2     Hajj Preparation Session   Jan 20, 2026   09:10           Present
  3     Hajj Ritual Training 2     Jan 25, 2026   08:00           Present

The main focus of this page is to answer the question:

**Which events has this congregant attended?**

There is no need to create a table listing all congregants, overall
regional statistics, or profile management features on this page.

------------------------------------------------------------------------

# 4.4 MY ATTENDANCE PAGE

**User:** Congregant.

**Purpose:** Allow congregants to monitor their own attendance history.

This page must prioritize the smartphone user experience.

## A. Header

Display:

-   Back button.
-   Title: My Attendance.
-   Short description about attendance history.

## B. Attendance Statistics

Display three key pieces of information.

  Statistic       Description
  --------------- -----------------------------------------
  Total Present   Number of events attended.
  Total Absent    Number of events with an absent status.
  Attendance      Attendance percentage.

## C. Attendance History

Use cards or a vertical list instead of a complex table.

Example:

``` text
+--------------------------------------+
| Independent Hajj Study Session       |
| January 11, 2026                     |
|                                      |
| Attendance Time       08:05 WIB      |
| Status                PRESENT        |
+--------------------------------------+

+--------------------------------------+
| Hajj Ritual Training                 |
| January 15, 2026                     |
|                                      |
| Attendance Time       -              |
| Status                ABSENT         |
+--------------------------------------+
```

Displayed information:

-   Event name.
-   Event date.
-   Attendance time.
-   Attendance status.

Provide a month or year filter if the history becomes extensive.

Congregants can only view their own data.

------------------------------------------------------------------------

# 5. BUSINESS RULES

This section contains the business rules that must be applied to the
system.

## 5.1 Attendance Calculation

The attendance percentage is calculated using the following formula:

Attendance Rate = (Number Present / Total Counted Attendance) × 100%

Total Counted Attendance = Total Present + Total Absent.

## 5.2 Event Status

Events are divided into three conditions:

  Status      Calculation
  ----------- -----------------------------------------------
  Upcoming    Not included in the calculation.
  Live        Not included in the calculation.
  Completed   Included in the attendance recap calculation.

Only Completed events are included in the final recap.

## 5.3 New Congregants

As previously decided, congregants who register after an event has been
completed can still be counted as absent from that event.

The system must have a mechanism to include these congregants in the
recap of a previous event with an Absent status.

## 5.4 Region Changes

A congregant's region history must be preserved.

If a congregant changes regions, attendance records for previous events
must not change to reflect their latest region.

Use the `region_id` stored in the attendance record as the reference for
the region at the time the event took place.

## 5.5 Regional Access Permissions

-   Admins can view all regions.
-   Leaders can only view their leadership region.
-   Congregants can only view their own attendance records.

Access validation is mandatory on the backend.

## 5.6 Attendance Uniqueness

A congregant may only have one attendance record for a single event.

Use the combination of `user_id` and `event_id` as a unique constraint.

------------------------------------------------------------------------

# 6. DATABASE REQUIREMENTS

The existing `attendances` table structure:

``` sql
CREATE TABLE attendances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    waktu_absen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_event (user_id, event_id)
);
```

This table stores congregants who have successfully scanned the QR Code.

However, congregants who do not scan the QR Code have no record, so the
system cannot directly calculate absences.

## 6.1 Recommended Additional Table

Create an `event_attendance_records` table.

Conceptual structure:

  Column        Conceptual Type   Description
  ------------- ----------------- ------------------------------------------
  id            INT               Primary key.
  event_id      INT               Event relationship.
  user_id       INT               Congregant relationship.
  region_id     INT               Region at the time the event took place.
  status        ENUM/VARCHAR      Present or Absent.
  waktu_absen   TIMESTAMP NULL    Time when the QR Code was scanned.

Add a unique constraint for the combination of `event_id` and `user_id`.

## 6.2 Attendance Data Synchronization

Ensure that the QR Code scanning process and attendance recap use a
consistent data source.

When a congregant successfully scans the QR Code:

-   The attendance record is updated to Present.
-   The attendance time is saved.
-   A duplicate record must not be created.

When a congregant does not scan the QR Code:

-   The status remains Absent.
-   The attendance time is set to NULL.

**Implementation note:** Before modifying the database, inspect the
existing table structures, relationships, QR Code scanning process, and
production data. Do not create duplicate tables or delete existing
tables without migration analysis.

------------------------------------------------------------------------

# 7. API REQUIREMENTS

The following endpoints are proposed API requirements, not assumptions
that these endpoints are already available.

Adjust them to match the API naming conventions and backend used by the
project.

  -----------------------------------------------------------------------------------------
  Method                  Endpoint                                  Function
  ----------------------- ----------------------------------------- -----------------------
  GET                     `/api/attendance/events`                  Retrieve the event
                                                                    recap list.

  GET                     `/api/attendance/events/:eventId`         Retrieve event details
                                                                    and participants.

  GET                     `/api/attendance/users/:userId/history`   Retrieve an individual
                                                                    congregant's event
                                                                    history.

  GET                     `/api/attendance/me`                      Retrieve attendance
                                                                    statistics and history
                                                                    for the logged-in user.
  -----------------------------------------------------------------------------------------

Requirements:

1.  The API must support the required search and filters.
2.  The API must enforce regional restrictions based on user roles.
3.  The API must validate authentication.
4.  Congregants must not be able to submit a `userId` to retrieve
    another congregant's data through their own endpoint.
5.  Response formats must follow the API standards already used by the
    project.

------------------------------------------------------------------------

# 8. RESPONSIVE DESIGN

## 8.1 Desktop

Primarily used by Admins and Leaders.

  Component            Recommendation
  -------------------- -------------------
  Statistics           4 columns
  Filters              Horizontal
  Event Table          Full table
  Event Details        Participant table
  Congregant History   History table

## 8.2 Mobile

Primarily used by Congregants, but Admin and Leader pages must also
remain responsive.

  Component            Recommendation
  -------------------- ------------------------
  Statistics           2 columns
  Filters              Stacked vertically
  Event Table          Cards
  Event Details        Vertical list or cards
  Congregant History   Cards
  My Attendance        Cards

Do not force tables with many columns onto small screens.

------------------------------------------------------------------------

# 9. UI/UX REQUIREMENTS

1.  Maintain the design system already used by the SIMAK project.
2.  Use the colors, typography, border radii, spacing, and components
    that are already available.
3.  Do not create a new design that is inconsistent with the current
    dashboard.
4.  Use icons that are relevant and consistent with the project's icon
    library.
5.  Use badges to distinguish Present and Absent statuses.
6.  Provide a loading state while data is being retrieved.
7.  Provide an empty state when no data is available.
8.  Provide an error state when a data request fails.
9.  Use pagination when the amount of data is too large.
10. Ensure that all interactions can be used on both desktop and
    smartphone devices.

------------------------------------------------------------------------

# 10. NON-FUNCTIONAL REQUIREMENTS

## 10.1 Security

-   All pages must follow the existing authentication system.
-   Apply role-based access control.
-   Validate regional access permissions on the backend.
-   Congregants may only access their own attendance data.
-   Do not rely on access restrictions implemented only on the frontend.

## 10.2 Performance

-   Avoid retrieving all attendance data at once when the data volume is
    large.
-   Use pagination.
-   Apply search and filters efficiently.
-   Avoid unnecessary repeated data retrieval.

## 10.3 Maintainability

-   Use reusable components.
-   Separate data-fetching logic from presentation components.
-   Follow the existing folder structure and coding conventions.
-   Do not perform major refactoring on application areas outside the
    scope of this feature.

------------------------------------------------------------------------

# 11. ACCEPTANCE CRITERIA

The feature is considered to meet the requirements when all of the
following conditions are fulfilled.

### Admin

-   [ ] Can open Attendance Recap through the Attendance menu.
-   [ ] Can view statistics across all regions.
-   [ ] Can search for events.
-   [ ] Can filter by date range.
-   [ ] Can view the event recap list.
-   [ ] Can open Event Details.
-   [ ] Can view the list of congregants who are present and absent.
-   [ ] Can view an individual congregant's event history.

### Leader

-   [ ] Can open Attendance Recap.
-   [ ] Can only view data from their leadership region.
-   [ ] Cannot access data from other regions by manipulating URLs or
    API requests.
-   [ ] Can open Event Details.
-   [ ] Can view the event history of a congregant within their region.

### Congregant

-   [ ] Can open My Attendance.
-   [ ] Can view their total attendance.
-   [ ] Can view their total absences.
-   [ ] Can view their attendance percentage.
-   [ ] Can view their attendance history.
-   [ ] Cannot view other congregants' data.

### Navigation

-   [ ] No Attendance submenu is added to the sidebar.
-   [ ] No Attendance submenu is added to the bottom navbar.
-   [ ] The Attendance menu in the grid directs users according to their
    role.
-   [ ] Event Details has a back button that returns to Attendance
    Recap.
-   [ ] Congregant Details has a mechanism for returning to the
    originating page.
-   [ ] Congregants have a back button to the main menu.
-   [ ] All routes are protected according to access permissions.

### Responsive Design

-   [ ] The desktop interface works properly.
-   [ ] The mobile interface works properly.
-   [ ] Tables do not cause disruptive horizontal overflow.
-   [ ] Statistics and history cards are easy to read on smartphones.

------------------------------------------------------------------------

# 12. IMPLEMENTATION GUIDELINES FOR AI AGENT

This document serves as the implementation reference for the Attendance
feature in the existing SIMAK project.

**IMPORTANT: The project already has code, a folder structure, an
authentication system, routing, UI components, and potentially API
integrations. Do not rebuild the application from scratch.**

Before implementation:

1.  Inspect the project folder structure.
2.  Inspect the routing system currently in use.
3.  Inspect the implementation of the Admin, Leader, and Congregant
    roles.
4.  Inspect the main menu page and the location of the menu grid.
5.  Inspect the existing Congregation Data page.
6.  Inspect the design system and UI components currently in use.
7.  Inspect the existing database structure and QR Code scanning
    process.
8.  Identify components and functionality that can be reused.

## Implementation Rules

-   Do not create a new Congregation Data menu.
-   Do not add a Congregation Data tab to the Attendance Recap page.
-   Do not modify the sidebar and bottom navbar structures.
-   Do not modify other features unrelated to Attendance.
-   Do not create mock data if the actual API is already available.
-   Do not create new API endpoints before inspecting the existing
    backend.
-   Do not modify the database without checking its relationships and
    the impact on existing features.
-   Maintain UI consistency with the SIMAK application.

## Work Sequence

Proceed in stages:

**Phase 1 --- Project Analysis** - Analyze the project structure. -
Identify existing routes and components. - Identify backend and database
integrations. - Report the required changes.

**Phase 2 --- Attendance Recap** - Implement the Attendance Recap
page. - Implement statistic cards. - Implement filters and search. -
Implement the event recap table.

**Phase 3 --- Event Details** - Implement the Event Details page. -
Implement participant statistics. - Implement the congregant list. -
Implement the status filter.

**Phase 4 --- Congregant History** - Integrate individual event history
with the existing Congregation Data menu. - Implement the list of events
attended. - Ensure there is no duplicate congregant management page.

**Phase 5 --- My Attendance** - Implement congregant attendance
statistics. - Implement attendance history. - Ensure data is restricted
to the logged-in user.

**Phase 6 --- Testing & Refinement** - Test access permissions for every
role. - Test all routes. - Test filters and search. - Test statistical
calculations. - Test responsive design. - Ensure existing features do
not experience regressions.

The AI Agent must complete the analysis and report its findings before
making any code changes. Do not implement all phases at once.

------------------------------------------------------------------------

# 13. FINAL PRODUCT SCOPE

The Attendance feature to be built consists of:

  Feature                     Admin   Leader   Congregant
  -------------------------- ------- -------- ------------
  Attendance Recap              ✓       ✓          \-
  Attendance Statistics         ✓       ✓          ✓
  Event Filters                 ✓       ✓          \-
  Event Details                 ✓       ✓          \-
  Present and Absent List       ✓       ✓          \-
  Individual Event History      ✓       ✓          \-
  My Attendance                \-       \-         ✓

**Outside the implementation scope:**

-   Creating a new Congregation Data menu.
-   Managing congregant documents and identities.
-   Creating a separate Event History menu.
-   Report export functionality.
-   Changing the existing QR Code scanning process without a clear
    technical requirement.
-   Adding an Attendance submenu to the sidebar or bottom navbar.

------------------------------------------------------------------------

# 14. FINAL DESIGN DECISION

The final design decisions for the Attendance feature are:

1.  The main menu grid serves as the entry point to the Attendance
    feature.
2.  Admins and Leaders are directed straight to the Attendance Recap
    page.
3.  There is no Congregation Data tab.
4.  Attendance Recap is event-oriented.
5.  Event Details displays participant statistics and a list of
    congregants who are present or absent.
6.  Congregant History focuses only on the events attended by that
    individual.
7.  Congregant History is integrated with the existing Congregation Data
    menu rather than creating a new menu.
8.  Congregants are directed straight to the My Attendance page.
9.  The Congregant page prioritizes the mobile experience.
10. All pages follow the existing SIMAK project design system and
    architecture.

**This document serves as the product requirements and implementation
reference for the Congregation Attendance Recap feature. Any changes to
the requirements in this document must be based on clear development
decisions, not AI Agent assumptions.**
