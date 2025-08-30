import React, { useState, useEffect } from 'react';
import Orb from './Orb.jsx';
import './Orb.css';

// Remove default browser margins/padding and add Inter font
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    font-family: 'Inter', sans-serif;
  }
  
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .nav-container {
    width: 100%;
    z-index: 1000;
    padding: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
  }

  .nav-links {
    display: flex;
    gap: 30px;
  }

  .nav-links a {
    text-decoration: none;
    color: white !important;
    font-weight: bold;
    transition: color 0.1s ease;
    padding: 8px 16px;
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
  }

  .nav-links a:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 120px;
    padding-bottom: 80px;
    z-index: 50;
    text-align: center;
    position: relative;
  }

  .orb-container-wrapper {
    position: relative;
    width: 500px;
    height: 500px;
    margin-bottom: 60px;
  }

  .spotto-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 64px;
    font-weight: bold;
    z-index: 60;
    text-shadow: 0 0 30px rgba(255,255,255,0.5);
    font-family: Helvetica, Arial, sans-serif;
    letter-spacing: -0.05em;
    font-stretch: condensed;
    line-height: 1;
  }

  .text-content {
    color: white;
    text-align: center;
    margin: 20px 0;
    font-family: 'Inter', sans-serif;
  }

  .text-content h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 0 0 20px rgba(255,255,255,0.3);
    font-family: 'Inter', sans-serif;
  }

  .text-content h2 {
    font-size: 1.8rem;
    margin: 20px 0;
    font-family: 'Inter', sans-serif;
  }

  .text-content p {
    font-size: 1.2rem;
    margin: 10px 0;
    opacity: 0.9;
    font-family: 'Inter', sans-serif;
  }

 .search-container {
            margin: 30px auto;
            text-align: center;
            max-width: 650px;
            padding: 0 20px;
            position: relative;
        }

        .search-bar-wrapper {
            display: inline-block;
            position: relative;
            width: 100%;
        }

        .search-input {
            width: 100%;
            padding: 12px 44px 12px 12px;
            font-size: 18px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            color: white;
            outline: none;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
            transition: all 0.2s ease;
        }

        .search-input:focus {
            border-color: rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.15);
        }

        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        .search-icon {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
        }

        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 8px;
            background: rgba(20, 20, 20, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            display: none;
        }

        .search-results.show {
            display: block;
        }

        .search-result-item {
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
        }

        .search-result-item:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .search-result-item:last-child {
            border-bottom: none;
        }

        .result-title {
            color: white;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 6px;
            line-height: 1.3;
        }

        .result-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }

        .result-type {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: white;
        }

        .result-deadline {
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
        }

        .result-description {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            line-height: 1.4;
        }

        .no-results {
            padding: 20px;
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-style: italic;
        }

        .results-header {
            padding: 12px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px 12px 0 0;
        }

        .results-count {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            font-weight: 500;
        }

        /* Custom scrollbar */
        .search-results::-webkit-scrollbar {
            width: 6px;
        }

        .search-results::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
        }

        .search-results::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
        }

        .search-results::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }

`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Your opportunities data
  const opportunities = [
    {
      "title": "2025 Belmont Innovation Labs Fall",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://belmont.csod.com/ux/ats/careersite/10/home/requisition/4160?c=belmont&sq=req4160",
      "description": "Supports civic governance solutions and changemaker leadership."
    },
    {
      "title": "2025 Regional Civic Tech Innovation Challenge (Asia Pacific)",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://belmont.csod.com/ux/ats/careersite/10/home/requisition/4160?c=belmont&sq=req4160",
      "description": "Support civic governance solutions and changemaker leadership."
    },
    {
      "title": "2025 AI & Neurotech Grants – Up to $300K",
      "type": "grant",
      "deadline": "June 30 2025",
      "link": "https://foresight.org/request-for-proposals/",
      "description": "Open call for proposals in cutting-edge brain tech and AI research."
    },
    {
      "title": "2025 Partner for Global Fund for Children (GFC)",
      "type": "internship",
      "deadline": "June 30 2025",
      "link": "https://globalfundforchildren.my.site.com/GFCGrants/s/expression-of-interest?language=en_US",
      "description": "Join a global network supporting youth-led, community-based organizations."
    },
    {
      "title": "2025 Postdoctoral Fellowships in Science Communication – South Africa",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://www0.sun.ac.za/crest/wp-content/uploads/2024/10/CREST-Postdoc-Application-2024.pdf",
      "description": "Advance civic science at Stellenbosch University in 2025."
    },
    {
      "title": "2025 Barak-Meghna River Basin Storytellers Fellowship",
      "type": "internship",
      "deadline": "June 20 2025",
      "link": "https://forms.gle/rG2r1KbyfW6qLo3y6",
      "description": "Support storytelling and environmental justice across South Asia."
    },
    {
      "title": "2025 The Leaders Summit 2025 – 20-100% Fee Waivers Available",
      "type": "volunteer",
      "deadline": "Dec 1 2025",
      "link": "https://isldofficial.com/washington-usa-register/",
      "description": "Build leadership capacity and global networks for impact."
    },
    {
      "title": "2025 UNESCO International Literacy Prizes",
      "type": "grant",
      "deadline": "June 27 2025",
      "link": "https://unesco-2023.limesurvey.net/913298?lang=en",
      "description": "Recognizing innovative and impactful literacy projects worldwide."
    },
    {
      "title": "2025 Teachers' Leadership Institute Canada (Fully Funded)",
      "type": "volunteer",
      "deadline": "June 16 2025",
      "link": "https://www.akfc.ca/get-involved/teachers-leadership-institute/",
      "description": "Global citizenship education program for outstanding educators."
    },
    {
      "title": "2025 AmplifyChange Opportunity Grant",
      "type": "grant",
      "deadline": "16 June 2025",
      "link": "https://amplifychange.org/grant-type/opportunity-grant/",
      "description": "Up to £75,000 to strengthen grassroots SRHR advocacy."
    },
    {
      "title": "2025 H2HC Prizes for Innovation – $300K",
      "type": "grant",
      "deadline": "July 1 2025",
      "link": "https://justfund.us",
      "description": "Advancing youth health equity through food and nutrition solutions."
    },
    {
      "title": "2025 Challenge Program Officer – MIT Solve",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://careers.peopleclick.com/careerscp/client_mit/external/jobDetails/jobDetail.html?jobPostId=32370&localeCode=en-us",
      "description": "Lead global open innovation challenges from within a dynamic team."
    },
    {
      "title": "Harvard Ventures-TECH Summer Program",
      "type": "summer",
      "deadline": "Rolling Admissions",
      "link": "https://tech.seas.harvard.edu/summer/apply",
      "description": "Join Harvard's summer tech program to learn from experts and work on innovative projects."
    },
    {
      "title": "Yale Young Global Scholars",
      "type": "summer",
      "deadline": "January 14th",
      "link": "https://globalscholars.yale.edu/how-to-apply",
      "description": "Academic enrichment program at Yale for outstanding high school students from around the world."
    },
    {
      "title": "Johns Hopkins Pre-College Summer Program",
      "type": "summer",
      "deadline": "January 8",
      "link": "https://summer.jhu.edu/programs-courses/pre-college-programs/",
      "description": "Rigorous summer courses for high school students in STEM and humanities."
    },
    {
      "title": "Dev Degree by Shopify",
      "type": "summer",
      "deadline": "September 15",
      "link": "https://devdegree.ca/",
      "description": "Four-year program with a paid internship at Shopify and a CS degree."
    },
    {
      "title": "Amazon Future Engineer Scholarship Program",
      "type": "summer",
      "deadline": "Seasonal Intake",
      "link": "https://www.amazonfutureengineer.com/scholarships",
      "description": "Scholarships and internship opportunities for students in CS or engineering."
    },
    {
      "title": "SHAD Canada",
      "type": "summer",
      "deadline": "Seasonal Intake",
      "link": "https://www.shad.ca/apply/",
      "description": "Summer enrichment program for high-achieving Canadian students in STEM and business."
    },
    {
      "title": "Meta Summer Academy",
      "type": "summer",
      "deadline": "Seasonal Intake",
      "link": "https://metasummeracademy.com/",
      "description": "Explore tech and product development careers at Meta with mentorship and hands-on experience."
    },
    {
      "title": "University of Toronto Camp Counsellor",
      "type": "summer",
      "deadline": "Seasonal Intake",
      "link": "https://www.uoft.ca/summer-camps",
      "description": "Lead and inspire campers at UofT's summer camps, develop leadership skills."
    },
    {
      "title": "The Rockefeller University Summer Science Research Program",
      "type": "summer",
      "deadline": "Seasonal Intake",
      "link": "https://www.rockefeller.edu/outreach/ssrp/",
      "description": "Summer research program for students interested in biomedical sciences."
    },
    {
      "title": "Columbia Writing Program",
      "type": "summer",
      "deadline": "Course Starts July 21-31",
      "link": "https://precollege.sps.columbia.edu/programs/summer-programs/columbia-writing-academy-summer",
      "description": "Two-week intensive writing course at Columbia for university or college prep."
    },
    {
      "title": "Nokia Summer Internship",
      "type": "summer",
      "deadline": "Seasonal Intake",
      "link": "https://www.nokia.com/about-us/careers/student-and-graduate-opportunities/canada/future-tech-summer-internship/",
      "description": "Eight-week internship with Nokia engineering teams."
    },
    {
      "title": "Summer Company Ontario",
      "type": "grant",
      "deadline": "Seasonal Intake",
      "link": "https://www.ontario.ca/page/start-summer-company-students",
      "description": "Learn to run your own student business with mentorship and support."
    },
    {
      "title": "Sick Kids Hospital",
      "type": "volunteer",
      "deadline": "March 20th",
      "link": "https://www.sickkids.ca/en/careers-volunteer/volunteering/volunteer-programs/",
      "description": "Volunteer at Toronto's largest children's hospital in various roles."
    },
    {
      "title": "St. Joseph Hospital",
      "type": "volunteer",
      "deadline": "Ongoing",
      "link": "https://www.volgistics.com/appform/2122758960",
      "description": "Support patients and staff in a healthcare setting."
    },
    {
      "title": "Micheal Garron Hospital",
      "type": "volunteer",
      "deadline": "Ongoing",
      "link": "https://www.tehn.ca/careers-volunteering/volunteering/student-volunteer-program",
      "description": "Hospital volunteer program with various support roles."
    },
    {
      "title": "Volunteering in India",
      "type": "volunteer",
      "deadline": "Ongoing",
      "link": "https://www.volunteeringindia.com/blog/best-volunteering-programs-in-india-for-high-school-students/#:~:text=Street%20Children%20Volunteering%20in%20India,-This%20is%20undoubt",
      "description": "Work with underprivileged children in India through education and support."
    },
    {
      "title": "Elections Canada",
      "type": "volunteer",
      "deadline": "Election Dependant",
      "link": "https://www.elections.ca/scripts/vis/FindED?L=e&ED=&EV=&EV_TYPE=&PC=&Prov=&ProvID=&MapID=&QID=-1&PageID=20&TPageID=33",
      "description": "Volunteer in federal elections and get paid above minimum wage."
    },
    {
      "title": "Art Gallery of Ontario",
      "type": "volunteer",
      "deadline": "Seasonal Intake",
      "link": "https://ago.ca/volunteer",
      "description": "Volunteer in various departments at the AGO and support art events."
    },
    {
      "title": "YMCA of Greater Toronto",
      "type": "volunteer",
      "deadline": "Ongoing",
      "link": "https://ymcagta.org/join-our-team/volunteer-with-the-ymca",
      "description": "Volunteer in youth programs, fitness, or community outreach across GTA."
    },
    {
      "title": "Toronto Public Library",
      "type": "volunteer",
      "deadline": "Ongoing",
      "link": "https://www.torontopubliclibrary.ca/about-the-library/volunteer/",
      "description": "Support literacy and learning at Toronto library branches."
    },
    {
      "title": "Royal Ontario Museum",
      "type": "volunteer",
      "deadline": "Seasonal Intake",
      "link": "https://www.rom.on.ca/en/join-us/volunteer",
      "description": "Volunteer at the ROM in guided tours and educational programs."
    },
    {
      "title": "Toronto Zoo",
      "type": "volunteer",
      "deadline": "Multiple Intakes",
      "link": "https://www.torontozoo.com/tz/volunteer",
      "description": "Help with animal care, education, and conservation programs."
    },
    {
      "title": "Daily Bread Food Bank",
      "type": "volunteer",
      "deadline": "Ongoing",
      "link": "https://www.dailybread.ca/volunteer/",
      "description": "Help sort, distribute food, or assist in outreach programs."
    },
    {
      "title": "Volunteer Toronto",
      "type": "volunteer",
      "deadline": "Ongoing",
      "link": "https://www.volunteertoronto.ca/networking/default.asp",
      "description": "Portal for many more Toronto volunteer opportunities."
    },
    {
      "title": "RBC Summer Tech Labs Program",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://jobs.rbc.com/ca/en/amplify",
      "description": "Eight-week paid internship with workshops and mentoring at RBC."
    },
    {
      "title": "TKS",
      "type": "internship",
      "deadline": "Ongoing",
      "link": "https://tks.softr.app/tks2526waitlist",
      "description": "Accelerator program for ambitious young people."
    },
    {
      "title": "Ladder Internships",
      "type": "internship",
      "deadline": "Constant Opportunities",
      "link": "https://www.ladderinternships.com/ladder-internships-blog/law-internships-for-high-school-stude",
      "description": "Connects high school students with remote internships."
    },
    {
      "title": "Indeed",
      "type": "internship",
      "deadline": "Constant Opportunities!",
      "link": "https://ca.indeed.com/q-internships-for-high-school-students-l-ontario-jobs.html",
      "description": "Job search platform listing internship opportunities."
    },
    {
      "title": "Cincinnati Museum",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://www.cincymuseum.org/internship-opportunities/",
      "description": "Unpaid internships in museum operations and education."
    },
    {
      "title": "Inspirit AI",
      "type": "internship",
      "deadline": "Constant Opportunities",
      "link": "https://www.inspiritai.com/blogs/ai-blog/business-internships-for-high-school-students",
      "description": "Curated list of business internships for students."
    },
    {
      "title": "Formation + Netflix Internship",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://formation.dev/partners/netflix",
      "description": "Collaborate with Netflix pros on tech projects."
    },
    {
      "title": "Stand Out Search",
      "type": "internship",
      "deadline": "Constant Opportunities!",
      "link": "https://www.standoutsearch.com/",
      "description": "Career platform connecting students with internships."
    },
    {
      "title": "Youth of Canada",
      "type": "internship",
      "deadline": "Constant Opportunities!",
      "link": "https://www.youthofcanada.ca/opportunities1",
      "description": "Connects students with scholarships and other opportunities."
    },
    {
      "title": "Job Bank Youth",
      "type": "internship",
      "deadline": "Constant Opportunities!",
      "link": "https://www.jobbank.gc.ca/youth",
      "description": "Government site for jobs and internships for youth."
    },
    {
      "title": "Crimson Education",
      "type": "internship",
      "deadline": "Ongoing",
      "link": "https://www.crimsoneducation.org/ca/blog/internships-for-high-school-students/",
      "description": "Website with high-quality internship listings."
    },
    {
      "title": "College Vine",
      "type": "internship",
      "deadline": "Ongoing",
      "link": "https://blog.collegevine.com/computer-science-internships-for-high-school-students",
      "description": "Blog with many internship opportunities for students."
    },
    {
      "title": "NASA Internships",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://stemgateway.nasa.gov/public/s/explore-opportunities",
      "description": "Internships at NASA centers for students interested in space."
    },
    {
      "title": "Air Force Research Library Scholar Program",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://afrlscholars.usra.edu/scholarsprogram/application/",
      "description": "Research opportunities in aerospace and defense technology."
    },
    {
      "title": "Genspace BioRocket Internship",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://www.genspace.org/biorocket",
      "description": "Biotechnology internship with hands-on lab experience."
    },
    {
      "title": "MIT Women's Technology Program",
      "type": "internship",
      "deadline": "Seasonal Intake",
      "link": "https://web.mit.edu/wtp/",
      "description": "Four-week summer program for female students in engineering and CS."
    },
    {
      "title": "Scholar Tree",
      "type": "scholarship",
      "deadline": "Seasonal Intake",
      "link": "https://scholartree.ca/find-scholarships",
      "description": "Scholarship website for high school students."
    },
    {
      "title": "Scholarships Canada",
      "type": "scholarship",
      "deadline": "Seasonal Intake",
      "link": "https://www.scholarshipscanada.com",
      "description": "Website that advertises tons of opportunities for high school students constantly."
    },
    {
      "title": "MITES (MIT Introduction to Tech)",
      "type": "STEM Program",
      "deadline": "February 1",
      "link": "https://mites.mit.edu",
      "description": "Strong math recs needed."
    },
    {
      "title": "RSI (Research Science Institute)",
      "type": "Research",
      "deadline": "December 1",
      "link": "https://www.cee.org/rsi",
      "description": "Olympiad winners favored."
    },
    {
      "title": "Google Summer of Code",
      "type": "Coding Intern",
      "deadline": "April 15",
      "link": "https://summerofcode.withgoogle.com",
      "description": "Open-source contributions help."
    },
    {
      "title": "NSF REU",
      "type": "Research",
      "deadline": "Varies (Feb-Mar)",
      "link": "https://www.nsf.gov/crssprgm/reu/",
      "description": "Contact PIs early."
    },
    {
      "title": "Bank of America Student Leaders",
      "type": "Business",
      "deadline": "January 31",
      "link": "https://www.bankofamerica.com/studentleaders",
      "description": "Community service focus."
    },
    {
      "title": "Princeton Laboratory Learning Program",
      "type": "STEM Research",
      "deadline": "March 15",
      "link": "https://pllp.princeton.edu",
      "description": "Requires research proposal."
    },
    {
      "title": "NASA SEES",
      "type": "STEM",
      "deadline": "February 28",
      "link": "https://www.tsgc.utexas.edu/sees/",
      "description": "Texas residents preferred."
    },
    {
      "title": "Smithsonian Internships",
      "type": "Various",
      "deadline": "Varies",
      "link": "https://internships.si.edu",
      "description": "Flexible durations."
    },
    {
      "title": "Intel ISEF",
      "type": "Competition",
      "deadline": "Varies (Feb)",
      "link": "https://www.societyforscience.org/isef/",
      "description": "Start with local science fair."
    },
    {
      "title": "MIT PRIMES-USA",
      "type": "Math Research",
      "deadline": "January 15",
      "link": "https://math.mit.edu/research/highschool/primes/usa/index.php",
      "description": "Proof skills required."
    },
    {
      "title": "Goldman Sachs Summer Analyst",
      "type": "Finance",
      "deadline": "November",
      "link": "https://www.goldmansachs.com/careers/students/programs/summer",
      "description": "Target school helps."
    },
    {
      "title": "Microsoft Explore Program",
      "type": "Tech",
      "deadline": "January",
      "link": "https://careers.microsoft.com/students",
      "description": "Freshmen/sophomores only."
    },
    {
      "title": "Telluride Association Summer Program (TASP)",
      "type": "Humanities",
      "deadline": "January 3",
      "link": "https://www.tellurideassociation.org",
      "description": "Essays are critical."
    },
    {
      "title": "Clark Scholars Program",
      "type": "Research",
      "deadline": "February 15",
      "link": "https://www.depts.ttu.edu/honors/academicsandenrichment/affiliatedandhighschool/clarks/",
      "description": "7-week intensive."
    },
    {
      "title": "LaunchX",
      "type": "Entrepreneurship",
      "deadline": "March",
      "link": "https://launchx.com",
      "description": "Business plan required."
    },
    {
      "title": "CISCO Technical Internship",
      "type": "Tech",
      "deadline": "Rolling",
      "link": "https://jobs.cisco.com",
      "description": "Networking certs help."
    },
    {
      "title": "NIH Summer Internship",
      "type": "Biomedical",
      "deadline": "March 1",
      "link": "https://www.training.nih.gov",
      "description": "NIH location required."
    },
    {
      "title": "JPMorgan Chase Winning Women",
      "type": "Finance",
      "deadline": "September",
      "link": "https://careers.jpmorgan.com",
      "description": "Women-focused."
    },
    {
      "title": "The Concord Review",
      "type": "Humanities",
      "deadline": "Rolling",
      "link": "https://www.tcr.org",
      "description": "Publish history papers."
    },
    {
      "title": "Meta University",
      "type": "Tech",
      "deadline": "February",
      "link": "https://www.metacareers.com",
      "description": "Underrepresented groups focus."
    },
    {
      "title": "MIT Lincoln Laboratory Internship",
      "type": "STEM Research",
      "deadline": "January",
      "link": "https://www.ll.mit.edu",
      "description": "Security clearance needed."
    },
    {
      "title": "NASA OSTEM",
      "type": "STEM",
      "deadline": "March",
      "link": "https://intern.nasa.gov",
      "description": "Multiple locations."
    },
    {
      "title": "Google STEP",
      "type": "Tech",
      "deadline": "December",
      "link": "https://buildyourfuture.withgoogle.com",
      "description": "First-years only."
    },
    {
      "title": "Amazon Future Engineer",
      "type": "Tech",
      "deadline": "November",
      "link": "https://www.amazonfutureengineer.com",
      "description": "Low-income focus."
    },
    {
      "title": "L'Oreal USA Fellowships",
      "type": "STEM",
      "deadline": "February",
      "link": "https://www.loreal.com",
      "description": "Women in STEM."
    },
    {
      "title": "Columbia Science Honors Program",
      "type": "STEM",
      "deadline": "September",
      "link": "https://www.sciencehonorsprogram.org",
      "description": "NYC residents only."
    },
    {
      "title": "KPCB Fellows",
      "type": "Tech",
      "deadline": "January",
      "link": "https://www.kleinerperkins.com",
      "description": "Startup experience helps."
    },
    {
      "title": "Thiel Fellowship",
      "type": "Entrepreneurship",
      "deadline": "December",
      "link": "https://thielfellowship.org",
      "description": "Supports young entrepreneurs with $100k and mentorship."
    },
    {
      "title": "Knight-Hennessy Scholars",
      "type": "Grad Fellowship",
      "deadline": "October",
      "link": "https://knight-hennessy.stanford.edu",
      "description": "Provides full funding for graduate study at Stanford University."
    },
    {
      "title": "Rhodes Scholarship",
      "type": "Grad Fellowship",
      "deadline": "October",
      "link": "https://www.rhodeshouse.ox.ac.uk",
      "description": "$70k per year for studying at Oxford University."
    },
    {
      "title": "Gates Cambridge",
      "type": "Grad Fellowship",
      "deadline": "October",
      "link": "https://www.gatescambridge.org",
      "description": "Full ride fellowship for graduate students at Cambridge University."
    },
    {
      "title": "Churchill Scholarship",
      "type": "STEM Grad",
      "deadline": "November",
      "link": "https://www.churchillscholarship.org",
      "description": "$60k funding for STEM graduate study at Cambridge University."
    },
    {
      "title": "Fulbright US Student Program",
      "type": "Grad/Research",
      "deadline": "October",
      "link": "https://us.fulbrightonline.org",
      "description": "Varies funding for research or teaching abroad in over 120 countries."
    },
    {
      "title": "Marshall Scholarship",
      "type": "Grad Fellowship",
      "deadline": "October",
      "link": "https://www.marshallscholarship.org",
      "description": "$40k per year for graduate study in the UK."
    },
    {
      "title": "Paul & Daisy Soros Fellowship",
      "type": "Grad",
      "deadline": "October",
      "link": "https://www.pdsoros.org",
      "description": "$90k funding for graduate students in the USA."
    },
    {
      "title": "Hertz Fellowship",
      "type": "STEM PhD",
      "deadline": "October",
      "link": "https://hertzfoundation.org",
      "description": "$250k for STEM PhD students in the USA."
    },
    {
      "title": "NSF GRFP",
      "type": "STEM Grad",
      "deadline": "October",
      "link": "https://www.nsfgrfp.org",
      "description": "$34k per year for STEM graduate students in the USA."
    }
  ];

  // Type color mapping
  const typeColors = {
    'internship': '#3B82F6',
    'summer': '#10B981',
    'volunteer': '#F59E0B',
    'grant': '#8B5CF6',
    'scholarship': '#EF4444',
    'entrepreneurship': '#EC4899',
    'research': '#06B6D4',
    'stem': '#84CC16'
  };

  const getTypeColor = (type) => {
    return typeColors[type.toLowerCase()] || '#6B7280';
  };

  // Search functionality
  const filterOpportunities = (query) => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return opportunities.filter(opp => 
      opp.title.toLowerCase().includes(searchTerm) ||
      opp.type.toLowerCase().includes(searchTerm) ||
      opp.description.toLowerCase().includes(searchTerm)
    ).slice(0, 6);
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      const results = filterOpportunities(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim();
      if (query) {
        const results = filterOpportunities(query);
        setSearchResults(results);
        setShowResults(true);
      }
    }
  };

  const handleResultClick = (link) => {
    window.open(link, '_blank');
  };

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ 
        width: '100vw', 
        minHeight: '100vh', 
        background: '#000000',
        position: 'relative',
        margin: 0,
        padding: 0
      }}>
        {/* Navigation */}
        <nav className="nav-container">
          <div className="nav-links">
            <a href="https://www.spot-to.com/summerprogram.html">SUMMER</a>
            <a href="https://www.spot-to.com/volunteer.html">VOLUNTEER</a>
            <a href="https://www.spot-to.com/Internship.html" target="_blank">INTERNSHIPS</a>
            <a href="https://www.spot-to.com/govg.html">GRANTS</a>
            <a href="https://www.spot-to.com/scholar.html">SCHOLARSHIPS</a>
            <a href="https://www.spot-to.com/blog.html" target="_blank">BLOG</a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          {/* Single Orb with SpotTO Text */}
          <div className="orb-container-wrapper">
            <Orb
              hoverIntensity={0}
              rotateOnHover={false}
              hue={0}
              forceHoverState={false}
            />
            <div className="spotto-text">SpotTO</div>
          </div>

          {/* Content Below Orb */}
          <div className="text-content">
            <h1>Connect to Volunteering Opportunities & More</h1>
            <p><i><b>Affiliated with Bloor Collegiate Institute</b></i></p>
            <h2>Internships • Volunteering • Scholarships</h2>

            {/* Search Bar */}
            <div className="search-container">
              <div className="search-bar-wrapper">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search for opportunities..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyPress={handleKeyPress}
                />
                <span className="search-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>

              {/* Search Results */}
              <div className={`search-results ${showResults ? 'show' : ''}`}>
                <div className="results-header">
                  <div className="results-count">
                    {searchResults.length === 0 && showResults ? 'No results found' : 
                     showResults ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found` : ''}
                  </div>
                </div>
                <div>
                  {searchResults.length === 0 && showResults ? (
                    <div className="no-results">No opportunities found for "{searchQuery}"</div>
                  ) : (
                    searchResults.map((opp, index) => (
                      <div key={index} className="search-result-item" onClick={() => handleResultClick(opp.link)}>
                        <div className="result-title">{opp.title}</div>
                        <div className="result-meta">
                          <span className="result-type" style={{backgroundColor: getTypeColor(opp.type)}}>{opp.type}</span>
                          <span className="result-deadline">Due: {opp.deadline}</span>
                        </div>
                        <div className="result-description">{opp.description}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;