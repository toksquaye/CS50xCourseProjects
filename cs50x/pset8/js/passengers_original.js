/**
 * passengers.js
 *
 * Computer Science 50
 * Problem Set 8
 *
 * Passengers on campus.
 */

var PASSENGERS = [
    {
        username: "abuchholtzau",
        name: "Allison Buchholtz-Au",
        house: "Adams House",
        placemark:0,
        marker: 0,
        seated:false
    },
    {
        username: "alexandermoore",
        name: "Alex Moore",
        house: "Adams House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "alisanguyen",
        name: "Alisa Nguyen",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "amymir",
        name: "Amy Mir",
        house: "Currier House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "angelali",
        name: "Angela Li",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "anovis",
        name: "Austen Novis",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "asellergren",
        name: "Andrew Sellergren",
        house: "Winthrop House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "behlum",
        name: "Armi Behlum",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "bhan",
        name: "Bo Han",
        house: "Winthrop House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "brandontineo",
        name: "Brandon Tineo",
        house: "Winthrop House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "bshryock",
        name: "Ben Shryock",
        house: "Dunster House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "caseygrun",
        name: "Casey Grun",
        house: "Cabot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "cbartholomew",
        name: "Christopher Bartholomew",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "cgong",
        name: "Cheng Gong",
        house: "Leverett House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "christophermueller",
        name: "Chris Mueller",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "cogden",
        name: "Colton Ogden",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "connorharris",
        name: "Connor Harris",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "cynthiameng",
        name: "Cynthia Meng",
        house: "Currier House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "danielcitron",
        name: "Daniel Citron",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "davidkaufman",
        name: "David Kaufman",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "dbradley",
        name: "Dan Bradley",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "dcoffey",
        name: "Dan Coffey",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "dfeffer",
        name: "Danielle Feffer",
        house: "Dunster House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "dhu",
        name: "Dianna Hu",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "ehebert",
        name: "Ed Hebert",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "farnham",
        name: "Daven Farnham",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "gabriellimaguimaraes",
        name: "Gabriel Guimaraes",
        house: "Thayer Hall",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "georgewu",
        name: "George Wu",
        house: "Dunster House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "hannahblumberg",
        name: "Hannah Blumberg",
        house: "Cabot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "holloway",
        name: "Glenn Holloway",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "iannightingale",
        name: "Ian Nightingale",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jacksonsteinkamp",
        name: "Jackson Steinkamp",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jawadhoballah",
        name: "Jawad Hoballah",
        house: "Dunster House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jfang",
        name: "JN Fang",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jjozwiak",
        name: "Jordan Jozwiak",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jlhu",
        name: "Jennifer Hu",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jmarks",
        name: "Jonathan Marks",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jmccormick",
        name: "Joe McCormick ",
        house: "Adams House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jonathanmiller",
        name: "Jonathan Miller",
        house: "Cabot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "joseph",
        name: "Joseph Ong",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jpochtar",
        name: "Jared Pochtar",
        house: "Wigglesworth Hall",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jsalazar01",
        name: "Julian Salazar",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "jyao",
        name: "Jessica Yao",
        house: "Leverett House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "karenxiao",
        name: "Karen Xiao",
        house: "Cabot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "katrynacadle",
        name: "Katryna Cadle",
        house: "Winthrop House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "kevin",
        name: "Kevin Schmid",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "kevinmu",
        name: "Kevin Mu",
        house: "Pforzheimer House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "ksherman",
        name: "Kendall Sherman",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lauren",
        name: "Lauren Carvalho",
        house: "Leverett House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lcheng",
        name: "Lucy Cheng",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "leviroth",
        name: "Levi Roth",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lfreitas",
        name: "Lucas Freitas",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lloyd",
        name: "Doug Lloyd",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lucianoarango",
        name: "Luciano Arango",
        house: "Adams House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "luisperez",
        name: "Luis Perez",
        house: "Leverett House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lukasmissik",
        name: "Lukas Missik",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lukechang",
        name: "Luke Chang",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lydiachen",
        name: "Lydia Chen",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "lytle",
        name: "Shannon Lytle",
        house: "Pforzheimer House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "malan",
        name: "David J. Malan",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "mcarmack",
        name: "Mary Carmack",
        house: "Leverett House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "mgeorgiadis",
        name: "Mari Georgiadis",
        house: "Dunster House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "milo",
        name: "Milo Banana",
        house: "Leverett House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "monks",
        name: "Keenan Monks",
        house: "Dunster House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "mrizzo",
        name: "Mike Rizzo",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "mxzhang",
        name: "Marshall Zhang",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "ngallimore",
        name: "Nick Gallimore",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "ngo12",
        name: "Phil Ngo",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "phan2",
        name: "Will Phan",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "pong",
        name: "Alex Pong",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "prschmid",
        name: "Patrick Schmid",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "pulkitagrawal",
        name: "Pulkit Agrawal",
        house: "Winthrop House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "pumpkin",
        name: "Jason Hirschhorn",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "ramyarangan",
        name: "Ramya Rangan",
        house: "Currier House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "rchen",
        name: "Rebecca Chen",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "rgalvan",
        name: "Ramon  Galvan ",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "rhedshi",
        name: "Rhed Shi",
        house: "Pforzheimer House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "rj",
        name: "R.J. Aquino",
        house: "Winthrop House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "rob",
        name: "Rob Bowden",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "rzurawicki",
        name: "Roger Zurawicki",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "sbalanovich",
        name: "Serguei Balanovich",
        house: "Cabot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "scottjohnson01",
        name: "Scott Johnson",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "sibraheem201501",
        name: "Saheela Ibraheem",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "spierce-durance",
        name: "Sebastian Pierce-Durance",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "swestover",
        name: "Shelley Westover",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "tdowns",
        name: "Travis Downs",
        house: "Dunster House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "thomasbarber",
        name: "TJ Barber",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "tlevine",
        name: "Theo Levine",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "tmclaughlin",
        name: "Tim McLaughlin",
        house: "Adams House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "tomasreimers",
        name: "Tomas Reimers",
        house: "Thayer Hall",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "tylermorrison",
        name: "Tyler Morrison",
        house: "Cabot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "vsriram",
        name: "Varun Sriram",
        house: "Kirkland House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "weilinchen",
        name: "Ina Chen",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "weiwu",
        name: "Winnie Wu",
        house: "Lowell House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "wesleychen",
        name: "Wesley Chen",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "williamhakim10",
        name: "Will Hakim",
        house: "Adams House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "wxiao",
        name: "Willy Xiao",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "yuhki",
        name: "Yukhi Yamashita",
        house: "Mather House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "zamyla",
        name: "Zamyla Chan",
        house: "Winthrop House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "zeng",
        name: "Chi Zeng",
        house: "Leverett House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "zezhouliu",
        name: "Alex Liu",
        house: "Quincy House",
        placemark: 0,
        marker: 0,
        seated:false
    },
    {
        username: "zhou12",
        name: "Sharon Zhou",
        house: "Eliot House",
        placemark: 0,
        marker: 0,
        seated:false
    }
];
