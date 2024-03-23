import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 2004;

app.use(express.urlencoded({ extended:true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const essayData = [
    { 
        id: 1,
        title: "How to WikiHow",
        content: 'This is the content of Essay 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    { 
        id: 2,
        title: "How to",
        content: 'This is the content of Essay 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    { 
        id: 3,
        title: "Title of Essay 3",
        content: 'Content of Essay 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    { 
        id: 4,
        title: "Exploring JavaScript",
        content: 'In this essay, we delve into the fundamentals of JavaScript programming. Lorem ipsum dolor...',
    },
    { 
        id: 5,
        title: "Artificial Intelligence and Ethics",
        content: 'This essay discusses the ethical considerations in the development and use of artificial intelligence...',
    },
    { 
        id: 6,
        title: "The Impact of Climate Change",
        content: 'Examining the environmental, social, and economic impacts of climate change on our planet...',
    },
    { 
        id: 7,
        title: "Space Exploration: Past, Present, and Future",
        content: 'A comprehensive look at humanity\'s journey into space, from the early days to the prospects for the future...',
    },
    { 
        id: 8,
        title: "The Art of Storytelling",
        content: 'Storytelling is a powerful form of expression. This essay explores the art of storytelling, its cultural significance, and its evolution in the digital age.',
    },
    { 
        id: 9,
        title: "Globalization and Its Impact on Cultures",
        content: 'Globalization has connected the world, but it also raises questions about cultural diversity. This essay analyzes the effects of globalization on various cultures.',
    },
    { 
        id: 10,
        title: "Challenges in Modern Education",
        content: 'Modern education faces numerous challenges. This essay discusses issues such as access to quality education, technology integration, and evolving teaching methods.',
    },
    { 
        id: 11,
        title: "The Power of Positive Thinking",
        content: 'Positive thinking can have a profound impact on one\'s life. This essay explores the benefits of maintaining a positive mindset and its effects on mental health.',
    },
    { 
        id: 12,
        title: "Journey into the Unknown: Space Exploration",
        content: 'Space exploration has captivated human imagination. This essay takes a journey into the unknown, discussing historic achievements and future possibilities.',
    },
    { 
        id: 13,
        title: "The Impact of Climate Change on Biodiversity",
        content: 'Climate change poses a significant threat to biodiversity. This essay examines the consequences of climate change on ecosystems and the need for conservation.',
    },
    { 
        id: 14,
        title: "The Role of Women in Leadership",
        content: 'The role of women in leadership positions is evolving. This essay explores the challenges faced by women in leadership roles and the importance of gender equality.',
    }
];

app.get("/", (req, res) => {
    res.render("index.ejs", { essays: essayData });
});

app.get("/Home", (req, res) => {
    res.render("index.ejs", { essays: essayData });
});

app.get("/Essays", (req, res) => {
    res.render("index.ejs", { essays: essayData });
});

app.get("/faq", (req, res) => {
    res.render("faq.ejs");
});

app.get("/quotes", (req, res) => {
    res.render("quotes.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/new", (req, res) => {
    const newTitle = req.body.title;
    const newContent = req.body.content;

    const newEssay = {
        id: essayData.length + 1,
        title: newTitle,
        content: newContent,
    };
    essayData.push(newEssay);
    res.redirect("/Essays");
});

app.get("/delete/:essayId", (req, res) => {
    const essayId = parseInt(req.params.essayId);

    const selectedEssay = essayData.find(essay => essay.id === essayId);

    if (selectedEssay) {
        res.render("delete.ejs", { essay: selectedEssay });
    } else {
        res.status(404).send('Essay not found');
    }
});

app.post("/delete/:essayId", (req, res) => {
    const essayId = parseInt(req.params.essayId);
    const essayIndex = essayData.findIndex(essay => essay.id === essayId);

    if (essayIndex !== -1) {
        essayData.splice(essayIndex, 1);
        res.redirect("/Essays");
    } else {
        res.status(404).send('Essay not found');
    }
});

app.get("/edit/:essayId", (req, res) => {
    const id = parseInt(req.params.essayId);
    console.log("Requested Essay ID:", id);

    const selectedEssay = essayData.find(essay => essay.id === id);

    if (!selectedEssay) {
        res.status(404).send('Essay not found');
        return;
    }

    res.render("edit.ejs", { essay: selectedEssay });
});

// Edit route (POST)
app.post("/edit/:essayId", (req, res) => {
    const id = parseInt(req.params.essayId);
    const updatedContent = req.body.updatedContent;
    const updatedTitle = req.body.updatedTitle;

    const selectedEssayIndex = essayData.findIndex(essay => essay.id === id);

    // Check if the essay is found
    if (selectedEssayIndex === -1) {
        res.status(404).send('Essay not found');
        return;
    }

    // Update the content and title of the selected essay in the essayData array
    essayData[selectedEssayIndex].content = updatedContent;
    essayData[selectedEssayIndex].title = updatedTitle;

    // Redirect to the index route with the updated essayData
    res.redirect("/Essays");
});

app.get("/read/:essayId", (req, res) => {
    const essayId = parseInt(req.params.essayId);
    const selectedEssay = essayData.find(essay => essay.id === essayId);

    if (!selectedEssay) {
        res.status(404).send('Essay not found');
        return;
    }

    res.render("read.ejs", { essay: selectedEssay });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});