import { getDb } from "../api/queries/connection";
import {
  hotEvents,
  sponsors,
  teamMembers,
  creators,
  leaderboardEntries,
  paymentSettings,
} from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // ---- Sponsors ----
  await db.delete(sponsors);
  await db.insert(sponsors).values([
    { name: "SPONSOR COMPANY 1", category: "PLATINUM SPONSOR", tagline: "Leading the future of technology.", link: "#", tier: "big", sortOrder: 1 },
    { name: "SPONSOR COMPANY 2", category: "GOLD SPONSOR", tagline: "Innovating with excellence.", link: "#", tier: "big", sortOrder: 2 },
    { name: "SPONSOR COMPANY 6", category: "GOLD SPONSOR", tagline: "Powering the next generation.", link: "#", tier: "big", sortOrder: 3 },
    { name: "SPONSOR COMPANY 3", category: "SILVER SPONSOR", tagline: "Building a better tomorrow.", link: "#", tier: "small", sortOrder: 4 },
    { name: "SPONSOR COMPANY 4", category: "BRONZE SPONSOR", tagline: "Supporting education and growth.", link: "#", tier: "small", sortOrder: 5 },
    { name: "SPONSOR COMPANY 5", category: "BRONZE SPONSOR", tagline: "Creating the future, together.", link: "#", tier: "small", sortOrder: 6 },
  ]);

  // ---- SAE team: faculty ----
  await db.delete(teamMembers);
  await db.insert(teamMembers).values([
    { name: "Dr. Sanjay Mishra", post: "Professor & HEAD", branch: "Mechanical Engineering Dept.", photoUrl: "https://github.com/adityatrymail/images/blob/main/IMGFaculty279.jpg?raw=true", groupName: "faculty", sortOrder: 1 },
    { name: "Dr. Dheerandra Singh", post: "Assistant Professor · Faculty Advisor SAE", branch: "Mechanical Engineering Dept.", photoUrl: "https://github.com/adityatrymail/images/blob/main/faculty.JPG?raw=true", groupName: "faculty", sortOrder: 2 },
    { name: "Dr. Rabesh Kumar Singh", post: "Assistant Professor · Faculty Advisor SAE", branch: "Mechanical Engineering Dept.", photoUrl: "https://github.com/adityatrymail/images/blob/main/IMGFaculty467.jpeg?raw=true", groupName: "faculty", sortOrder: 3 },
    // ---- Post holders ----
    { name: "Abhinav Pratap Singh", post: "ChairPerson", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/509267843_18366214711182222_5950869176448722328_n.webp?raw=true", instagram: "@abhinavsingh2535", linkedin: "linkedin.com/in/abhinav-pratap-singh-257a38258", email: "abhinavpratapsingh010@gmail.com", groupName: "postholders", sortOrder: 1 },
    { name: "Ansh Shukla", post: "Vice-Chairperson", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/503610562_18366214720182222_1166049392477191456_n.webp?raw=true", instagram: "@anshshukla1303", linkedin: "linkedin.com/in/ansh-shukla-557542263", email: "anshshukla0001@gmail.com", groupName: "postholders", sortOrder: 2 },
    { name: "Ayush Kumar Singh", post: "Vice-Chairperson", branch: "Electrical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/509671913_18366214729182222_6618237273431321811_n.webp?raw=true", instagram: "@artistically_an_engineer", linkedin: "linkedin.com/in/ayush-singh-5a846b258", groupName: "postholders", sortOrder: 3 },
    { name: "Ashutosh Pandey", post: "Treasurer", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/502428989_18366214738182222_1447720130898628642_n.webp?raw=true", instagram: "@ashupandey_17", linkedin: "linkedin.com/in/ashutoshpandey17", groupName: "postholders", sortOrder: 4 },
    { name: "Gurdeepak Singh", post: "Department Related Activities", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/510454993_18366214747182222_1729852300193434664_n.webp?raw=true", groupName: "postholders", sortOrder: 5 },
    { name: "Soumya Upadhyay", post: "Event Coordinator", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/510970593_18366214756182222_7024520359907112317_n.webp?raw=true", instagram: "@saumya.u0_0", linkedin: "linkedin.com/in/saumya-upadhyay-959a44284", groupName: "postholders", sortOrder: 6 },
    { name: "Kushagra Omar", post: "Event Coordinator", branch: "Electronics and Communication Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/502590993_18366214765182222_1705422065660774165_n.webp?raw=true", instagram: "@kushagra.omar", linkedin: "linkedin.com/in/kushagraomar3355", groupName: "postholders", sortOrder: 7 },
    { name: "Kanishka Singh", post: "Event Coordinator", branch: "Civil Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/509822376_18366214774182222_3707088430854833010_n.webp?raw=true", groupName: "postholders", sortOrder: 8 },
    { name: "Sarthak Saran", post: "Event Coordinator", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/503561373_18366214792182222_6160885537959171358_n.webp?raw=true", linkedin: "linkedin.com/in/sarthak-saran-79ba09297", groupName: "postholders", sortOrder: 9 },
    { name: "Yashdeep Singh", post: "Event Coordinator", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/502515564_18366214783182222_5215676298109051213_n.webp?raw=true", instagram: "@mr.singh_2513", linkedin: "linkedin.com/in/yashdeep-singh-ys3107", groupName: "postholders", sortOrder: 10 },
    { name: "Harshit Soni", post: "BAJA Head", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/510966395_18366214801182222_3582309624416468768_n.webp?raw=true", instagram: "@harshit192345", linkedin: "linkedin.com/in/harshit-soni-90826b263", groupName: "postholders", sortOrder: 11 },
    { name: "Vaibhav Pandey", post: "Supra Head", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/503679362_18366214810182222_7936151716845163287_n.webp?raw=true", instagram: "@vaibhav__7225", linkedin: "linkedin.com/in/vaibhav-pandey-06164228a", groupName: "postholders", sortOrder: 12 },
    { name: "Aman Kumar Singh", post: "AeroModelling Head", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/503628103_18366214828182222_8451549945534516546_n.webp?raw=true", groupName: "postholders", sortOrder: 13 },
    { name: "Shruti Singh", post: "Digital SubCouncil Head", branch: "Chemical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/503657631_18366214825182222_7007872649636598833_n.webp?raw=true", instagram: "@_shruti13__", linkedin: "linkedin.com/in/shruti-singh-9a330427b", groupName: "postholders", sortOrder: 14 },
    { name: "Hariom Pandey", post: "Media and Photography", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/509750097_18366214837182222_8820114174661689485_n.webp?raw=true", instagram: "@_hariompandey07", linkedin: "linkedin.com/in/hariom-pandey-53131a289/", groupName: "postholders", sortOrder: 15 },
    { name: "Shivam", post: "Media and Photography", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/503503798_18366214846182222_3153373366668890807_n.webp?raw=true", instagram: "@shiva.mkv_", linkedin: "linkedin.com/in/shivamyadav-editor", groupName: "postholders", sortOrder: 16 },
    { name: "Alankrit Gupta", post: "Sponsorship and Alumni Coordinator", branch: "Mechanical Engineering", photoUrl: "https://github.com/adityatrymail/images/blob/main/509163427_18366214855182222_8313802691031269367_n.webp?raw=true", instagram: "@alankr.it", linkedin: "linkedin.com/in/alankrit-gupta-b22b1621a", groupName: "postholders", sortOrder: 17 },
    { name: "Shweta Singh", post: "Sponsorship and Alumni Coordinator", branch: "Mechanical Engineering", photoUrl: null, groupName: "postholders", sortOrder: 18 },
  ]);

  // ---- Creators & mentors ----
  await db.delete(creators);
  await db.insert(creators).values([
    { name: "Nikhil Srivastava", branch: "Information Technology", post: "Senior TEAM LEAD", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2016.15.10_c7301d92.jpg?raw=true", instagram: "https://instagram.com", linkedin: "https://linkedin.com", kind: "mentor", sortOrder: 1 },
    { name: "Anurag Singh", branch: "Mechanical Engineering", post: "Senior TEAM LEAD", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2014.56.56_5553c894.jpg?raw=true", instagram: "https://instagram.com", linkedin: "https://linkedin.com", kind: "mentor", sortOrder: 2 },
    { name: "Aditya Pratap Singh", branch: "Electronics and Communication Engineering", post: "Executive Member SAE", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2013.13.36_e05b9d58.jpg?raw=true", message: "Passionate about creating innovative web solutions that make a difference. I love turning complex problems into simple, beautiful designs.", instagram: "https://instagram.com/adityaprasingh", linkedin: "https://linkedin.com/in/adityaprasingh", kind: "creator", sortOrder: 1 },
    { name: "Divyansh Mishra", branch: "Electronics and Communication Engineering", post: "Executive Member SAE", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2011.31.57_50f18215.jpg?raw=true", message: "Curious and creative, always learning new skills, solving problems, and building smart solutions with a mix of logic and innovation.", instagram: "https://www.instagram.com/theodoredivyansh", linkedin: "https://www.linkedin.com/in/divyansh-mishra-9972ab259/", kind: "creator", sortOrder: 2 },
    { name: "Ananya Yadav", branch: "Computer Science and Engineering", post: "Executive Member SAE", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2011.30.35_bb93b420.jpg?raw=true", message: "Tech enthusiast with strong problem-solving skills and a knack for creating efficient solutions. I love designing, innovating, and building impactful projects that juniors find inspiring and motivating.", instagram: "https://youtube.com/@art_withananaya", linkedin: "https://www.linkedin.com/in/ananya-yadav-50ba71327b", kind: "creator", sortOrder: 3 },
    { name: "Ansh Mishra", branch: "Information Technology", post: "Executive Member SAE", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2013.11.04_5ac0d839.jpg?raw=true", message: "Dedicated to crafting efficient and reliable web solutions. I believe in combining logic with creativity to build tools that make a meaningful impact.", instagram: "https://www.instagram.com/ansh_mishra_0307", linkedin: "http://linkedin.com/in/ansh-mishra-812484333", kind: "creator", sortOrder: 4 },
    { name: "Sarthak Jain", branch: "Information Technology", post: "Executive Member SAE", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2011.31.22_b9b33e23.jpg?raw=true", message: "Driven by curiosity and creativity, I enjoy crafting digital solutions that blend functionality with elegance. My goal is to make technology simple and impactful.", instagram: "https://www.instagram.com/sarthak047._", linkedin: "https://www.linkedin.com/in/sarthak-jain-615b76324", kind: "creator", sortOrder: 5 },
    { name: "Nili Singh", branch: "Information Technology", post: "Executive Member SAE", photoUrl: "https://github.com/adityatrymail/images/blob/main/IMG-20250629-WA0259%20(1)%20(1)%20-%20Nili%20Singh.jpg?raw=true", message: "Passionate about automotive innovation and teamwork, I love turning creative ideas into impactful projects that inspire learning and growth.", instagram: "https://www.instagram.com/n_nili20", linkedin: "https://www.linkedin.com/in/nili-singh-0a8b8a327", kind: "creator", sortOrder: 6 },
    { name: "Aditya Kumar", branch: "Information Technology", post: "Executive Member SAE", photoUrl: "https://github.com/adityatrymail/images/blob/main/WhatsApp%20Image%202025-09-20%20at%2014.29.57_aaeccccf.jpg?raw=true", message: "Driven by a commitment to quality, I enjoy transforming challenges into opportunities by finding effective solutions and fixing bugs.", instagram: "https://instagram.com/aadithexplorer", linkedin: "https://www.linkedin.com/in/aditya-kumar-278150273", kind: "creator", sortOrder: 7 },
  ]);

  // ---- Hot events ----
  await db.delete(hotEvents);
  await db.insert(hotEvents).values([
    {
      name: "BURNOUT — RC Racing Showdown",
      description: " Build, tune and race your RC machine through qualifiers, durability runs and the grand final. 325 points separate the podium from the pack.",
      eventDate: "Main Arena",
      venue: "MMMUT Campus, Gorakhpur",
      showOnHomepage: true,
    },
    {
      name: "Durability Test",
      description: "How long can your machine survive? A gruelling endurance run worth up to 75 points. Suspension, cooling and driver focus decide who lasts the distance.",
      eventDate: "Day 1",
      venue: "Track B",
      showOnHomepage: true,
    },
    {
      name: "Manoeuvrability Challenge",
      description: "A tight slalom of cones, ramps and hairpins. Precision driving earns up to 50 points — clip a cone and watch the scoreboard slip away.",
      eventDate: "Day 2",
      venue: "Technical Arena",
      showOnHomepage: true,
    },
  ]);

  // ---- Leaderboard sample ----
  await db.delete(leaderboardEntries);
  await db.insert(leaderboardEntries).values([
    { teamName: "Throttle Titans", prefinalQualified: true, prefinalPosition: 1, prefinalPoints: 40, finalQualified: true, finalPosition: 1, finalPoints: 100, durability: 70, manoeuvrability: 46, technical: 45, mixedBonus: 10 },
    { teamName: "Nitro Knights", prefinalQualified: true, prefinalPosition: 2, prefinalPoints: 36, finalQualified: true, finalPosition: 2, finalPoints: 88, durability: 68, manoeuvrability: 44, technical: 42, mixedBonus: 10 },
    { teamName: "Apex Predators", prefinalQualified: true, prefinalPosition: 3, prefinalPoints: 33, finalQualified: true, finalPosition: 3, finalPoints: 80, durability: 65, manoeuvrability: 40, technical: 44, mixedBonus: 0 },
    { teamName: "Torque Masters", prefinalQualified: true, prefinalPosition: 4, prefinalPoints: 30, finalQualified: true, finalPosition: 4, finalPoints: 72, durability: 60, manoeuvrability: 42, technical: 40, mixedBonus: 10 },
    { teamName: "Redline Racers", prefinalQualified: true, prefinalPosition: 5, prefinalPoints: 28, finalQualified: false, finalPosition: 0, finalPoints: 0, durability: 58, manoeuvrability: 38, technical: 38, mixedBonus: 0 },
  ]);

  // ---- Payment settings (single row) ----
  await db.delete(paymentSettings);
  await db.insert(paymentSettings).values({
    upiId: "sae-mmmut@upi",
    registrationFee: "₹3000 per team",
    bankName: "To be updated by admin",
    accountHolder: "SAE Collegiate Club MMMUT",
  });

  console.log("Done.");
  process.exit(0);
}

seed();
