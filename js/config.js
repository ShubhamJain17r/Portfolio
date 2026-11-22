/**
 * Shubham Jain — Portfolio Configuration
 */

const PORTFOLIO_CONFIG = {
  profile: {
    name: "Shubham Jain",
    title: "Hardware Systems & Robotics",
    bio: "Undergraduate student at GLA University (3rd Year, 5th Sem, CPI 8.7) and former visiting student at IIT Gandhinagar. Lead Hardware Engineer at Dhritam (medical tech startup). Focused on embedded C firmware, KiCad PCB design, and robotics kinematics.",
    links: {
      github: "https://github.com/ShubhamJain17r",
      linkedin: "https://linkedin.com/in/shubhamjain17r",
      leetcode: "https://leetcode.com/ShubhamJain17r",
      email: "shubhamjain00050@gmail.com"
    }
  },

  projects: [
    {
      id: "xarm-color-sorter",
      title: "xArm 1S Color Sorting Robot",
      domain: "robotics",
      domainLabel: "Robotics",
      description: "6-DOF articulated robotic arm automation project using OpenCV HSV color segmentation for object localization and analytical inverse kinematics for trajectory planning and pick-and-place sorting.",
      tags: ["Robotics", "Inverse Kinematics", "Python", "OpenCV", "Serial UART"],
      repoUrl: "https://github.com/ShubhamJain17r/xArm-1S-Color-Sorting-Robot",
      isPrivate: false
    },
    {
      id: "stm32-line-follower",
      title: "STM32 Autonomous High-Speed Line Follower",
      domain: "robotics",
      domainLabel: "Robotics",
      description: "Autonomous competition robot on STM32F446RE: bare-metal C++ closed-loop PID control, dual hardware quadrature encoders, 20 kHz ultrasonic PWM motor drive, 8-channel optical sensor array, and custom modular PCB.",
      tags: ["STM32F446RE", "PID Control", "Embedded C++", "Quadrature Encoders", "PCB Design"],
      repoUrl: "https://github.com/ShubhamJain17r/STM32-Line-Follower-Robot",
      isPrivate: false
    },
    {
      id: "stm32-library",
      title: "STM32 Bare-Metal Peripheral Drivers Library",
      domain: "firmware",
      domainLabel: "Embedded Firmware",
      description: "Lightweight, register-level bare-metal C library targeting STM32 ARM Cortex-M microcontrollers directly on CMSIS register maps without vendor HAL layers. Drivers for USART (with DMA circular buffer mode), SPI full-duplex, I2C, and timers.",
      tags: ["Embedded C", "STM32", "ARM Cortex-M", "CMSIS Registers", "DMA"],
      repoUrl: "https://github.com/ShubhamJain17r/STM32-Library",
      isPrivate: false
    },
    {
      id: "stm32-components",
      title: "STM32 Modular Components Library",
      domain: "firmware",
      domainLabel: "Embedded Firmware",
      description: "Modular C driver interfaces for common external hardware components including OLED (SSD1306) and color TFT (ST7789) displays, 6-axis IMUs (MPU6050 with DMP), and ADCs with non-blocking APIs and timeout guards.",
      tags: ["Embedded C", "I2C", "SPI", "SSD1306", "ST7789", "MPU6050"],
      repoUrl: "https://github.com/ShubhamJain17r/STM32-Components",
      isPrivate: false
    },
    {
      id: "dhritam-medtech",
      title: "Dhritam Medical Hardware Architecture",
      domain: "medtech",
      domainLabel: "MedTech Hardware",
      description: "Lead Hardware Engineer designing point-of-care medical diagnostic instrumentation. Developed 4-layer mixed-signal PCBs in KiCad, conditioned low-noise analog bio-potential signals (AFE), and managed isolated battery power rails. (Proprietary startup hardware).",
      tags: ["KiCad", "PCB Design", "Analog Front-End", "Bio-Signals", "Power Budgeting"],
      repoUrl: "",
      isPrivate: true
    },
    {
      id: "jpmc-cfg-2026",
      title: "JPMorganChase Code For Good Hackathon 2026",
      domain: "algorithms",
      domainLabel: "Hackathons",
      description: "National Finalist at JPMorganChase's 24-hour engineering hackathon. Built a full-stack social impact solution for partner non-profit organizations, collaborating in an agile sprint.",
      tags: ["Hackathon", "JPMorganChase", "Finalist", "Systems"],
      repoUrl: "https://github.com/ShubhamJain17r",
      isPrivate: false
    },
    {
      id: "leetcode-350",
      title: "Algorithmic Problem Solving (350+ Solved)",
      domain: "algorithms",
      domainLabel: "Algorithms",
      description: "Over 350 algorithmic problems solved on LeetCode covering graph algorithms (BFS/DFS, Dijkstra, A*), dynamic programming, trees, and state machines applicable to robotics path planning.",
      tags: ["C++", "Algorithms", "Graph Theory", "Dynamic Programming", "Motion Planning"],
      repoUrl: "https://leetcode.com/ShubhamJain17r",
      isPrivate: false
    }
  ]
};
