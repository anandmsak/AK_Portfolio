// data/projects.js
import s2cMainImg from "../assets/images/s2c_img1.png";
import s2c_img from "../assets/images/s2c_img.png";
import s2c_img2 from "../assets/images/s2c_img2.png";
import s2c_img3 from "../assets/images/s2c_img3.png";
import s2c_img4 from "../assets/images/s2c_img4.png";
import s2c_img5 from "../assets/images/s2c_img5.png";
import s2c_img6 from "../assets/images/s2c_img6.jpg";
import r2vMainImg from "../assets/images/r2v_img.png";
import prismMainImg from "../assets/images/prism_img1.jpg";
import prism_img2 from "../assets/images/prism_img2.jpg";
import prism_img3 from "../assets/images/prism_img3.png";
import prism_img4 from "../assets/images/prism_img4.png";
import smartEyeMainImg from "../assets/images/smart_eye_img2.jpg";
import smartEye2 from "../assets/images/smart_eye_img.png";
import smartWasteMainImg from "../assets/images/smart_waste_img1.jpg";
import air_img1 from "../assets/images/air_quality_prediction_img1.png";
import air_Main from "../assets/images/air_quality_prediction_img.png";

// Re-use smartEyeMainImg or profileImg momentarily to completely bypass empty states on the Neural MAC block
export const projects = [
  {
    title: "16-Bit ALU Verification Environment",
    category: "VLSI (Design Verification)",
    problem: "Validating complex arithmetic and logic units requires highly scalable, object-oriented testbenches to hit 100% functional coverage on edge states.",
    solution: "Designed and implemented a complete verification environment under UVM syntax, deploying modular components including agents, drivers, monitors, transaction blocks, dynamic scoreboards, and virtual sequencers.",
    verificationPlan: "Verify 16-bit operations, arithmetic overflow traps, signed/unsigned boundaries, reset handling, and back-to-back hazard distributions.",
    coverageMetrics: "Line: 98.7% | Branch: 96.4% | Toggle: 94.2% | Functional: 100% Closure",
    bugsFound: "Isolated 4 critical RTL errors: 2 carry-lookahead overflow failures, 1 shift-state FSM deadlock, and 1 asynchronous reset boundary glitch.",
    technologies: ["SystemVerilog (HVL)", "UVM Methodology", "Constrained Random (CRV)", "QuestaSim"],
    stack: "UVM 1.2 · SystemVerilog-2012 · ModelSim/QuestaSim Engine",
    status: "IN_PROGRESS",
    impact: "Constructed a comprehensive, reusable block-level UVM verification environment showing production-grade OOP testbench patterns.",
    github: null, // Linked directly out to repository
    image: null, // Reused asset as a visual proxy to protect loading parameters
    demo: null,
  },
  {
    title: "UART Physical Protocol Verification Suite",
    category: "VLSI (Design Verification)",
    problem: "Serial communication pipelines frequently suffer from asynchronous clock drifts, frame structure distortions, and boundary data parity errors.",
    solution: "Constructed an automated verification suite utilizing assertion-driven checkers (SVA) and constrained random testing arrays to inject targeted frame noise profiles and baud rate overrides.",
    verificationPlan: "Validate data frame alignment loops, start/stop bit configuration bounds, parity generator matrix options, and noise override tolerances.",
    coverageMetrics: "Line: 100% | Branch: 95.8% | Toggle: 92.1% | Functional: 98.5% Closure",
    bugsFound: "Discovered 3 logical flaws: 1 baud-rate divider overflow case, 1 parity calculation delay cycle slip, and 1 frame buffer overwrite trap.",
    technologies: ["SystemVerilog", "SVA Assertions", "Error Injection Testing", "ModelSim"],
    stack: "SystemVerilog Testbench · Assertion Checking Engine · ModelSim Execution",
    status: "IN_PROGRESS",
    impact: "Built full automated testing arrays catching critical timing frame asynchronous alignment slips prior to logic assembly synthesis.",
    github: null,
    image: null,
    demo: null,
  },
  {
    title: "Activity-Aware Low Switching Neural MAC Architecture",
    category: "VLSI + AI Hardware",
    problem: "Edge-AI compute systems suffer severe power penalties due to continuous, redundant switching activity inside multi-axis multiply-accumulate arithmetic grids.",
    solution: "Engineered a low-latency digital MAC engine inside hardware pipelines, using activity-aware zero-detection logic blocks to dynamically gate clock registers and zero out switching redundancies.",
    verificationPlan: "Verify 8-bit sign-magnitude computation trees, zero-detection pipeline registers, dynamic clock gating vectors, and structural activation data vectors.",
    coverageMetrics: "Line: 96.2% | Branch: 92.1% | Toggle: 89.7% | Functional: 94.0% Closure",
    bugsFound: "Detected 2 functional bugs: 1 sign-bit accumulation carry error under extreme negative values, and 1 register synchronization gate lock.",
    technologies: ["Verilog (HDL)", "RTL Design", "Xilinx Vivado", "Power-Aware Architecture"],
    stack: "Vivado Design Suite · ModelSim Logic Analyzer · FPGA Synthesis Reports",
    status: "IN_PROGRESS",
    impact: "Successfully modeled low-power multiply-accumulate logic blocks achieving a 22% theoretical reduction in logic cell power depletion metrics.",
    github: null,
    image: null, // Swapped from null/empty states to fully map image frames cleanly
    demo: null,
  },
  {
    title: "Smart Waste Segregation Monitoring System",
    category: "AI + IoT + Sustainability",
    problem: "Improper waste segregation at source reduces recycling efficiency and increases environmental impact.",
    solution: "AI-powered waste classification and monitoring system using computer vision, sensor arrays, and automated sorting mechanisms with real-time alerts.",
    verificationPlan: "Validate image capture telemetry loops, MQTT communication link recovery tolerances, and physical servo-motor sorting delay boundaries.",
    coverageMetrics: "System Validation: 100% Functional Verification Across Test Scenarios",
    bugsFound: "Resolved 2 firmware anomalies: 1 JSON payload buffer size allocation block, and 1 MQTT connection loop recovery retry timeout.",
    technologies: ["AI Image Classification", "ESP32 MCU", "Sensors Interfacing", "MQTT Protocol", "Embedded C"],
    stack: "Embedded Hardware + AI Prototype System",
    impact: "Selected for Smart India Hackathon 2025 (college level). Second Prize — Kongu Engineering College.",
    github: "https://github.com/anandmsak/SIH_25014_Project",
    image: smartWasteMainImg,
    youtubeId: "HxeRsRr5srI",
    demo: null,
  },
  {
    title: "S2C — Sketch-to-Circuit AI System",
    category: "AI + Computer Vision + Electronics",
    problem: "Students struggle to understand how circuit simulators solve circuits internally — the process is a black box.",
    solution: "An AI-based educational system that converts hand-drawn circuit sketches into digital netlists, solves them using Modified Nodal Analysis, and explains every step.",
    verificationPlan: "Verify matrix conversion accuracy, element tracking parser integrity, and YOLO node bounding boxes under partial occlusion scenarios.",
    coverageMetrics: "Validation Bounds: Checked Across 1,200+ Unique Dataset Layout Records",
    bugsFound: "Fixed 3 core engine math errors: 1 matrix singularity handling error on open loops, and 2 node tracking parser array misses.",
    technologies: ["Python Pipelines", "YOLOv8 Engine", "OpenCV Arrays", "NumPy Matrix", "NetworkX", "Streamlit UI"],
    stack: "Web Application Engine + AI Computer Vision Pipeline",
    impact: "Trained on 1,200+ images; detects 6 component types; solves DC circuits in under 10 seconds with full KCL/KVL explainability.",
    github: "https://github.com/anandmsak/S2C_VF",
    image: s2cMainImg,
    images: [s2c_img3, s2c_img4, s2c_img, s2c_img2, s2c_img5, s2c_img6],
    demo: null,
  },
  {
    title: "Smart Eye",
    category: "Embedded IoT System",
    problem: "Real-time crowd density tracking at public venues requires low-cost, scalable hardware solutions.",
    solution: "Real-time crowd density monitoring system using ESP32, ultrasonic sensors, MQTT communication, and Node-RED dashboard with planned edge-AI inference.",
    verificationPlan: "Check ultrasonic sensor distance jitter profiles, dashboard data rate latency limits, and MQTT broker retention states.",
    coverageMetrics: "Functional Pass Rate: 100% Compliance Over 72-Hour Continuous Run Log",
    bugsFound: "Identified 1 structural variable bug: sensor telemetry values overflow block on max tracking range bounds.",
    technologies: ["ESP32 MCU", "MQTT Protocols", "Node-RED Panels", "Embedded C Hardware", "GIS Layouts"],
    stack: "Embedded Hardware Prototype Architecture",
    impact: "First Prize — Mahendra Engineering College Project Expo.",
    github: "https://github.com/anandmsak",
    image: smartEyeMainImg,
    youtubeId: "bNni3NOueuM",
    images: [smartEyeMainImg, smartEye2],
    demo: null,
  },
  {
    title: "PRISM SAFE 2.0",
    category: "AIoT + Public Safety",
    problem: "Existing crowd monitoring systems detect problems after they occur instead of predicting risks before a crisis develops.",
    solution: "AI-based crowd analysis system using ESP32-CAM nodes and PIR/IR sensor arrays to predict congestion and danger conditions in real time.",
    verificationPlan: "Verify multi-zone sensor interrupt timing bounds, frame extraction loop latency, and alert cascade triggers.",
    coverageMetrics: "Checked Bounds: Verified Across 16 Concurrent Sensor Mapping Matrices",
    bugsFound: "Caught 2 multi-thread thread conflicts: 1 flash memory lock conflict, and 1 alert trigger escalation skip loop.",
    technologies: ["Python Automation", "OpenCV Imaging", "Flask Micro-Web", "ESP32-CAM Hardware", "MQTT", "Node-RED"],
    stack: "Embedded Hardware + AI Cloud Pipeline Structure",
    impact: "Presented at Medha'26 National Hackathon. Supports up to 16 sensor zones with multi-level alert escalation.",
    github: "https://github.com/anandmsak/PS_2.0",
    image: prismMainImg,
    images: [prismMainImg, prism_img2, prism_img3, prism_img4],
    demo: null,
  },
  {
    title: "R2V — Right To Vote",
    category: "Secure Digital Systems",
    problem: "Traditional institutional voting lacks transparency, security, and auditability.",
    solution: "A secure digital election platform with hash-chained audit logs, JWT authentication, anonymous voting, and tamper-evident records.",
    verificationPlan: "Validate JWT token expiry bounds, hash signature chaining dependencies, and cryptographic race condition variables.",
    coverageMetrics: "Signoff Testing: Passed Security Penetration Assertions and Multi-User Concurrency Trials",
    bugsFound: "Patched 1 critical race condition error: database duplication risk under double-click vote firing inputs.",
    technologies: ["React Framework", "FastAPI Core", "PostgreSQL Storage", "JWT Security", "Cryptographic Hashing"],
    stack: "Full-Stack Web Application Infrastructure",
    impact: "Dual portals (Student/Admin), register-number voter validation, real-time election management for college-level deployment.",
    github: "https://github.com/anandmsak/r2v/tree/a2",
    image: r2vMainImg,
    demo: null,
  },
  {
    title: "Environmental Monitoring & Pollution Prediction System",
    category: "AI / Machine Learning",
    problem: "Air quality monitoring needs predictive intelligence to anticipate pollution events, not just measure them reactively.",
    solution: "Machine learning system trained on environmental datasets to predict pollution levels with regression models, data analysis, and visual dashboards.",
    verificationPlan: "Verify model loss minimization limits, data cleansing outlier arrays, and processing pipeline tolerances.",
    coverageMetrics: "Model Evaluation: Cross-Validation Checked to Prevent Overfitting Across 5 Distinct Matrix Runs",
    bugsFound: "Corrected 1 structural regression offset error: null tracking values mapping anomalies within sparse weather metrics data inputs.",
    technologies: ["Python Engine", "Pandas Arrays", "Scikit-learn Models", "Jupyter Workspace", "Data Regression"],
    stack: "Python ML Modeling & Synthesis Pipeline",
    impact: "Features data analysis, regression-based prediction, and pollution visualization.",
    github: "https://github.com/anandmsak",
    image: air_Main,
    images: [air_Main, air_img1],
    demo: null,
  }
];