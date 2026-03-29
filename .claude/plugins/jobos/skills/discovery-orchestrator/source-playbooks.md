# Source Playbooks — How to Navigate Job Websites

This guide explains step-by-step how to search each job source, what works best for higher education roles, and what pitfalls to avoid.

---

## LinkedIn Jobs

### Best For
- Academic administration roles
- Program coordinator positions
- Student affairs roles
- Higher education consulting

### Search Strategy

**Accessing LinkedIn Jobs:**
1. Go to linkedin.com
2. Click "Jobs" in the top navigation
3. If not logged in, you'll need to log in (or create a free account)

**Search Terms That Work for Higher Ed:**
- "Academic Advisor" OR "Student Advisor"
- "Program Coordinator" OR "Academic Program Coordinator"
- "Director of Student Success"
- "Curriculum Coordinator"
- "Faculty Development"
- "Academic Affairs"
- "Registrar" OR "Academic Records"
- "Dean of Students"
- "First Year Experience"

**Location Filters:**
- Use candidate's preferred locations from `search_preferences.yml`
- For remote roles, select "Remote" in location filter
- Multiple locations can be searched separately

**Experience Level:**
- Focus on "Mid-Senior level" and "Director" levels
- Avoid "Entry level" unless role has leadership component

### Navigation Pattern

1. **Initial Search:**
   - Enter search term in keywords field
   - Enter location in location field
   - Click "Search"

2. **Scroll Through Results:**
   - LinkedIn uses infinite scroll — keep scrolling to load more results
   - Each job card shows: title, company, location, posting date
   - Collect 2-3 pages of results (approximately 30-50 listings)

3. **Extract Job Details:**
   - Click on a job listing to open full details
   - Take snapshot of the job page
   - Extract: title, employer, location, description, application URL

4. **Move to Next Job:**
   - Click browser back button to return to results
   - Click next listing
   - Repeat

### Common Pitfalls

**LinkedIn Login Wall:**
- **Problem:** LinkedIn limits how many jobs you can view without logging in
- **Solution:** Log in with a free account before starting search

**Infinite Scroll Fatigue:**
- **Problem:** Results keep loading as you scroll; hard to know when to stop
- **Solution:** Set a limit — collect 2-3 pages, then move to next search term

**Premium Job Postings:**
- **Problem:** Some listings require LinkedIn Premium to view
- **Solution:** Skip these — they're a small minority of postings

### Rate Limiting
- No strict limit, but pausing 2-3 seconds between clicks avoids triggering bot detection
- If you see "Please verify you're a human" CAPTCHA, stop and wait 5-10 minutes

---

## Indeed

### Best For
- Community college roles
- State university positions
- Student services positions
- Larger volume of postings

### Search Strategy

**Accessing Indeed:**
1. Go to indeed.com
2. No login required for basic searching

**Search Terms That Work:**
- "Higher Education" + role (e.g., "Higher Education Academic Advisor")
- "University" + role (e.g., "University Program Coordinator")
- "College" + role (e.g., "College Registrar")
- "Student Affairs"
- "Academic Support"

**Location Strategy:**
- Indeed works well with specific cities or regions
- "Remote" option is available in location filter

### Navigation Pattern

1. **Initial Search:**
   - Enter "Higher Education [role]" in job title field
   - Enter location in location field
   - Click "Find jobs"

2. **Page Through Results:**
   - Indeed uses numbered pages (not infinite scroll)
   - Click "Next page" to advance
   - Review 3-5 pages (60-100 listings)

3. **Extract from Listing Page:**
   - Indeed shows basic info on the results page
   - Click "Apply now" or "Easy Apply" to get full details
   - Some postings redirect to employer website — follow that link

### Common Pitfalls

**Job Aggregation vs. Direct Postings:**
- **Problem:** Indeed scrapes jobs from other sites; some links go elsewhere
- **Solution:** Follow the redirect to the original posting — extract from there for better data

**Duplicate Listings:**
- **Problem:** Same job posted multiple times by different agencies
- **Solution:** Deduplication logic in `merge-discoveries.ts` handles this

**Sponsored Jobs:**
- **Problem:** Sponsored postings appear at top, may not be relevant
- **Solution:** Still review them, but don't prioritize over organic matches

### Rate Limiting
- Indeed is generally permissive
- Pause 1-2 seconds between page loads

---

## Google Jobs

### Best For
- Broad search across multiple sources
- Discovering postings on niche sites
- Quick scan of what's available

### Search Strategy

**Accessing Google Jobs:**
1. Go to google.com
2. Search for: "[role] jobs near [location]"
3. Click "Jobs" tab in Google results

**Search Examples:**
- "academic advisor jobs near Boston"
- "higher education program coordinator jobs remote"
- "university registrar jobs California"

### Navigation Pattern

1. **Review Aggregated Results:**
   - Google Jobs pulls from multiple sources
   - Each listing shows source (LinkedIn, Indeed, employer site, etc.)
   - Note the source — helps with deduplication later

2. **Extract from Listings:**
   - Click listing to see details
   - Extract title, employer, location, description
   - **Important:** Click through to original source to get the application URL

3. **Filter by Date Posted:**
   - Use "Past 24 hours" or "Past 3 days" filter
   - Focus on recent postings

### Common Pitfalls

**Indirect Listings:**
- **Problem:** Google Jobs is an aggregator — doesn't host listings itself
- **Solution:** Always click through to original source for complete data

**Incomplete Descriptions:**
- **Problem:** Google Jobs preview may truncate descriptions
- **Solution:** Click through to full posting on original site

### Rate Limiting
- Very permissive — designed for browsing
- Still, pause briefly between clicks to avoid pattern detection

---

## HigherEdJobs

### Best For
- Academic administration roles
- Student affairs positions
- Higher education specialist roles
- National and international postings

### Search Strategy

**Accessing HigherEdJobs:**
1. Go to higheredjobs.com
2. No login required for browsing

**Search Terms:**
- Use their category system:
  - "Student Affairs and Services"
  - "Academic Affairs"
  - "Registrar"
  - "Curriculum"
  - "Teaching and Instruction" (for administrative teaching roles)

**Location Strategy:**
- Select state or region from dropdown
- "Remote" option available

### Navigation Pattern

1. **Browse by Category:**
   - Select relevant category from homepage
   - Add location filter
   - Sort by "Date Posted" (newest first)

2. **Page Through Results:**
   - HigherEdJobs shows 50 listings per page
   - Review 2-3 pages

3. **Extract Details:**
   - Click job title for full posting
   - Extract all fields from detail page

### Common Pitfalls

**Paywall for Full Details:**
- **Problem:** Some features require paid subscription
- **Solution:** Free access covers most details — only skip if clearly blocked

**Older Postings:**
- **Problem:** Some postings are weeks or months old
- **Solution:** Sort by date and skip postings older than 30 days

### Rate Limiting
- HigherEdJobs has no strict rate limiting
- Standard browsing pace is fine

---

## ChronicleVitae

### Best For
- Academic administrative roles
- Higher education leadership
- International university positions

### Search Strategy

**Accessing ChronicleVitae:**
1. Go to chroniclevitae.com/jobs
2. Free account may be required for full access

**Search Terms:**
- "Academic Administration"
- "Student Affairs"
- "Academic Advising"
- "University Administration"

### Navigation Pattern

1. **Search by Category:**
   - Use "Administration" category
   - Add filters for location and job type

2. **Extract Details:**
   - Click listings for full details
   - Note application deadlines (common on ChronicleVitae)

### Common Pitfalls

**Account Requirement:**
- **Problem:** Some features require free account creation
- **Solution:** Create account if needed, or skip if not worth it

**Smaller Volume:**
- **Problem:** Fewer postings than major job boards
- **Solution:** Use ChronicleVitae as supplementary source, not primary

---

## University HR Websites (Direct Sources)

### Best For
- Most up-to-date postings
- Complete application details
- Positions that may not appear on job boards

### Finding University HR Pages
- Search: "[University name] jobs" or "[University name] careers"
- Examples: "jobs.harvard.edu", "careers.stanford.edu", "universityjobs.miami.edu"

### Search Strategy

**On University HR Sites:**
1. Look for "Search Jobs" or "Open Positions"
2. Filter by category:
   - "Student Affairs"
   - "Academic Affairs"
   - "Administration"
   - "Registrar"
   - "Curriculum"

3. Extract details directly from postings

### Common Pitfalls

**Clunky Search Interfaces:**
- **Problem:** University HR systems vary widely in quality
- **Solution:** Be patient — use broad filters, then manually scan results

**Application Accounts:**
- **Problem:** Many require account creation to apply
- **Solution:** Extract job details without applying — account creation is execution phase

### Rate Limiting
- University sites typically have no rate limiting
- Respectful browsing pace is appropriate

---

## General Best Practices

### Search Order
1. Start with **LinkedIn Jobs** (best interface, good filtering)
2. Then **Indeed** (large volume, finds postings elsewhere)
3. Then **Google Jobs** (broad sweep, discovers niche sources)
4. Then **HigherEdJobs** (higher-ed specialist)
5. Finally **university direct sources** (most current, but slower)

### How Many Results to Collect
- **Per search term:** 20-40 listings
- **Per session:** 100-200 total unique jobs
- Focus on quality over quantity — better to have 50 well-matched jobs than 500 poor matches

### When to Stop
- You've collected 50-100 unique jobs
- You've checked all primary sources
- Results become repetitive (same jobs appearing across sources)
- Job board blocks access (rate limit or CAPTCHA)

### What to Skip
- K-12 roles (unless candidate explicitly wants these)
- Corporate training roles
- Sales-heavy positions ("Business Development," "Admissions Representative" with quotas)
- Roles outside candidate's geographic preferences
- Duplicate postings (same job on multiple sources)

### Handling Errors
- **Page doesn't load:** Skip that listing, move to next
- **CAPTCHA appears:** Wait 5-10 minutes, then try again or switch sources
- **Site blocks access:** Stop using that source for today, try again tomorrow
- **Data looks incomplete:** Extract what's available — better partial data than nothing
