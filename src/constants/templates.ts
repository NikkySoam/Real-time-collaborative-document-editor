export const templates = [
    {
        id:"blank",
        label:"Blank Document",
        imageUrl: "/blank-document.svg",
        initialContent:""
    },

    {
        id:"software-proposal",
        label:"Software development proposal",
        imageUrl: "/software-proposal.svg",
        initialContent:`
        <div style="width:400px; height:500px; background:#f2f2f2; position:relative; padding:40px;">

    <h1 style="
      color:#0f6f6f;
      font-size:24px;
      font-weight:bold;
      margin-top:100px;
      line-height:1.4;
      letter-spacing:1px;
    ">
      SOFTWARE <br>
      DEVELOPMENT <br>
      PROPOSAL
    </h1>

    <div style="margin-top:60px; color:#777;">
      <p style="font-size:12px; font-weight:bold;">PREPARED FOR</p>
      <p style="font-size:12px;">Client's name</p>
      <p style="font-size:12px;">Client's company name</p>
    </div>

    <div style="margin-top:20px; color:#777;">
      <p style="font-size:12px; font-weight:bold;">PREPARED BY</p>
      <p style="font-size:12px;">Your name</p>
      <p style="font-size:12px;">Your company name</p>
    </div>

  </div>

`
    },

    {
        id:"project-proposal",
        label:"Project proposal",
        imageUrl: "/project-proposal.svg",
        initialContent :`
        <div style="width:500px; height:650px; margin:20px auto; background:white; position:relative; overflow:hidden;">

    <!-- Top Right Shape -->
    <div style="
      width:180px;
      height:180px;
      background:#0f6f6f;
      border-bottom-left-radius:180px;
      position:absolute;
      top:0;
      right:0;
    "></div>

    <!-- Bottom Left Shape -->
    <div style="
      width:200px;
      height:200px;
      background:#0f6f6f;
      border-top-right-radius:200px;
      position:absolute;
      bottom:0;
      left:0;
    "></div>

    <!-- Content -->
    <div style="padding:50px; position:relative; z-index:1;">

      <!-- Title -->
      <h1 style="
        color:#0f6f6f;
        font-size:28px;
        line-height:1.3;
        margin-top:60px;
        font-weight:bold;
      ">
        PROJECT <br>
        PROPOSAL
      </h1>

      <!-- Subtitle -->
      <p style="font-size:14px; color:#666; margin-top:10px;">
        A brief description of your project proposal goes here.
      </p>

      <!-- Divider -->
      <div style="
        width:60px;
        height:3px;
        background:#0f6f6f;
        margin:20px 0;
      "></div>

      <!-- Prepared For -->
      <div style="margin-top:40px;">
        <p style="font-size:12px; color:#888; font-weight:bold;">PREPARED FOR</p>
        <p style="font-size:13px; color:#333;">Client Name</p>
        <p style="font-size:13px; color:#333;">Client Company</p>
      </div>

      <!-- Prepared By -->
      <div style="margin-top:20px;">
        <p style="font-size:12px; color:#888; font-weight:bold;">PREPARED BY</p>
        <p style="font-size:13px; color:#333;">Your Name</p>
        <p style="font-size:13px; color:#333;">Your Company</p>
      </div>

      <!-- Date -->
      <div style="margin-top:20px;">
        <p style="font-size:12px; color:#888; font-weight:bold;">DATE</p>
        <p style="font-size:13px; color:#333;">01 April 2026</p>
      </div>

    </div>

  </div>`
    },

    {
        id:"business-letter",
        label:"Business letter",
        imageUrl: "/business-letter.svg",
        initialContent :`
         <div style="width:650px; margin:40px auto; background:white; padding:50px; box-shadow:0 0 10px rgba(0,0,0,0.1);">

    <!-- Header (Company / Name) -->
    <div style="text-align:left;">
      <h2 style="margin:0; color:#0f6f6f;">Your Company Name</h2>
      <p style="font-size:13px; color:#555;">
        Your Address | City, State <br>
        Email: your@email.com | Phone: 1234567890
      </p>
    </div>

    <!-- Date -->
    <div style="margin-top:25px; font-size:13px; color:#555;">
      <p>01 April 2026</p>
    </div>

    <!-- Receiver -->
    <div style="margin-top:10px; font-size:13px; color:#555;">
      <p>Recipient Name</p>
      <p>Company Name</p>
      <p>Company Address</p>
    </div>

    <!-- Subject -->
    <div style="margin-top:20px;">
      <p style="font-weight:bold;">Subject: Business Proposal / Inquiry</p>
    </div>

    <!-- Greeting -->
    <div style="margin-top:15px;">
      <p>Dear Sir/Madam,</p>
    </div>

    <!-- Body -->
    <div style="margin-top:15px; font-size:14px; color:#333; line-height:1.7; text-align:justify;">
      <p>
        I hope this message finds you well. I am writing to introduce our company and explore potential opportunities 
        for collaboration. We specialize in providing high-quality solutions tailored to meet client needs.
      </p>

      <p>
        Our team has extensive experience in delivering efficient and scalable solutions, and we are confident that 
        we can add value to your organization. We would appreciate the opportunity to discuss how we can work together.
      </p>

      <p>
        Please feel free to contact us for further discussion. We look forward to your response.
      </p>
    </div>

    <!-- Closing -->
    <div style="margin-top:25px;">
      <p>Sincerely,</p>
      <p style="margin-top:40px; font-weight:bold;">Your Name</p>
      <p style="font-size:13px; color:#555;">Your Position</p>
    </div>

  </div>`
    },

    {
        id:"resume",
        label:"Resume",
        imageUrl: "/resume.svg",
        initialContent :`
        <div style="width:700px; margin:20px auto; background:white; display:flex; box-shadow:0 0 10px rgba(0,0,0,0.1);">

    <div style="width:35%; background:#0f6f6f; color:white; padding:30px;">

      <h2 style="margin-bottom:5px;">Your Name</h2>
      <p style="margin-top:0; font-size:14px;">Web Developer</p>

      <div style="margin-top:30px;">
        <h3 style="font-size:14px; border-bottom:1px solid white;">CONTACT</h3>
        <p style="font-size:12px;">📞 123-456-7890</p>
        <p style="font-size:12px;">📧 email@gmail.com</p>
        <p style="font-size:12px;">📍 Your City</p>
      </div>

      <div style="margin-top:30px;">
        <h3 style="font-size:14px; border-bottom:1px solid white;">SKILLS</h3>
        <p style="font-size:12px;">HTML, CSS, JavaScript</p>
        <p style="font-size:12px;">React, Node.js</p>
        <p style="font-size:12px;">MongoDB</p>
      </div>

      <div style="margin-top:30px;">
        <h3 style="font-size:14px; border-bottom:1px solid white;">EDUCATION</h3>
        <p style="font-size:12px;">B.Tech in Computer Science</p>
        <p style="font-size:12px;">Your College Name</p>
      </div>

    </div>

    <!-- RIGHT CONTENT -->
    <div style="width:65%; padding:30px;">

      <div>
        <h3 style="color:#0f6f6f;">PROFILE</h3>
        <p style="font-size:13px; color:#555;">
          Passionate web developer with experience in building modern applications using React and Node.js.
        </p>
      </div>

      <div style="margin-top:20px;">
        <h3 style="color:#0f6f6f;">EXPERIENCE</h3>

        <p style="font-weight:bold; margin-bottom:2px;">Frontend Developer</p>
        <p style="font-size:12px; color:#888;">Company Name | 2024 - Present</p>
        <p style="font-size:13px; color:#555;">
          Developed responsive web applications and improved performance.
        </p>

        <p style="font-weight:bold; margin-top:15px; margin-bottom:2px;">Intern</p>
        <p style="font-size:12px; color:#888;">Company Name | 2023</p>
        <p style="font-size:13px; color:#555;">
          Assisted in building UI components and fixing bugs.
        </p>
      </div>

      <div style="margin-top:20px;">
        <h3 style="color:#0f6f6f;">PROJECTS</h3>

        <p style="font-weight:bold;">Chat Application</p>
        <p style="font-size:13px; color:#555;">
          Built a real-time chat app using Socket.io, JWT authentication, and MongoDB.
        </p>

        <p style="font-weight:bold; margin-top:10px;">Food Ordering Website</p>
        <p style="font-size:13px; color:#555;">
          Developed a responsive food ordering platform using React and Redux.
        </p>
      </div>

    </div>

  </div>
`
    },

    {
        id:"cover-letter",
        label:"Cover letter",
        imageUrl: "/cover-letter.svg",
        initialContent :`
        <div style="width:650px; margin:30px auto; background:white; display:flex; box-shadow:0 0 10px rgba(0,0,0,0.1);">

    <!-- LEFT ACCENT BAR -->
    <div style="width:20px; background:#0f6f6f;"></div>

    <!-- MAIN CONTENT -->
    <div style="padding:40px; width:100%;">

      <!-- Header -->
      <div style="border-bottom:2px solid #0f6f6f; padding-bottom:10px;">
        <h2 style="margin:0; color:#0f6f6f;">Your Name</h2>
        <p style="margin:5px 0; font-size:13px; color:#555;">
          📧 your@email.com | 📞 1234567890 | 📍 Your City
        </p>
      </div>

      <!-- Date -->
      <div style="margin-top:20px; font-size:13px; color:#555;">
        <p>01 April 2026</p>
      </div>

      <!-- Receiver -->
      <div style="margin-top:10px; font-size:13px; color:#555;">
        <p>Hiring Manager</p>
        <p>Company Name</p>
        <p>Company Address</p>
      </div>

      <!-- Subject -->
      <div style="margin-top:20px;">
        <p style="font-weight:bold;">Subject: Application for Web Developer Role</p>
      </div>

      <!-- Greeting -->
      <div style="margin-top:15px;">
        <p>Dear Hiring Manager,</p>
      </div>

      <!-- Body -->
      <div style="margin-top:15px; font-size:14px; color:#333; line-height:1.6; text-align:justify;">
        <p>
          I am excited to apply for the Web Developer position at your company. 
          I have hands-on experience in developing modern web applications using React, Node.js, and MongoDB.
        </p>

        <p>
          I recently built a real-time chat application using Socket.io and a food ordering website using React and Redux, 
          which enhanced my problem-solving and full-stack development skills.
        </p>

        <p>
          I am passionate about building scalable applications and continuously improving my technical skills. 
          I would love the opportunity to contribute to your team.
        </p>
      </div>

      <!-- Closing -->
      <div style="margin-top:20px;">
        <p>Sincerely,</p>
        <p style="margin-top:40px;">Your Name</p>
      </div>

    </div>

  </div>`
    },

    {
        id:"letter",
        label:"Letter",
        imageUrl: "/letter.svg",
        initialContent :`
         <div style="width:600px; margin:40px auto; background:white; padding:40px; box-shadow:0 0 10px rgba(0,0,0,0.1);">

    <!-- Sender Info -->
    <div style="text-align:right; font-size:13px; color:#555;">
      <p>Your Name</p>
      <p>Your Address</p>
      <p>Your Email</p>
      <p>Your Phone</p>
    </div>

    <!-- Date -->
    <div style="margin-top:20px; font-size:13px; color:#555;">
      <p>01 April 2026</p>
    </div>

    <!-- Receiver Info -->
    <div style="margin-top:20px; font-size:13px; color:#555;">
      <p>Hiring Manager</p>
      <p>Company Name</p>
      <p>Company Address</p>
    </div>

    <!-- Subject -->
    <div style="margin-top:20px;">
      <p style="font-weight:bold; font-size:14px;">Subject: Application for Web Developer Position</p>
    </div>

    <!-- Greeting -->
    <div style="margin-top:20px; font-size:14px;">
      <p>Dear Sir/Madam,</p>
    </div>

    <!-- Body -->
    <div style="margin-top:15px; font-size:14px; color:#333; line-height:1.6; text-align:justify;">
      <p>
        I am writing to express my interest in the Web Developer position at your esteemed organization. 
        I have experience in building modern web applications using technologies like React, Node.js, and MongoDB.
      </p>

      <p>
        During my academic projects, I developed a real-time chat application and a food ordering website, 
        which helped me strengthen my skills in frontend and backend development.
      </p>

      <p>
        I am highly motivated, eager to learn, and passionate about creating efficient and user-friendly applications. 
        I would welcome the opportunity to contribute to your team.
      </p>
    </div>

    <!-- Closing -->
    <div style="margin-top:20px; font-size:14px;">
      <p>Sincerely,</p>
      <p style="margin-top:40px;">Your Name</p>
    </div>

  </div>`
    },
]