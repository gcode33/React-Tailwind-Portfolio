import { ArrowRight, Github } from "lucide-react"

const projects = [
    {
        id: 1,
        title: "multiSport Tracker",
        description: "A simple sports tracking application to view teams, players, games and stats using visual studio code C# to do front end and backend work for the application",
        image: "/projects/Screenshot 2025-10-16 154308.png",
        tags: ["Visual Studio", "C#", "API"],
        githubUrl: "https://github.com/gcode33/MultiSportTracker"
    },
    {
        id: 2,
        title: "City of Toronto Event Finder",
        description: "A web application to find events in the city of Toronto using React for the frontend and Node.js for the backend and The city of Toronto's public API to fetch event data.",
        image: "/projects/Screenshot 2025-11-16 113222.png",
        tags: ["React", "Node.js", "API"],
        githubUrl: "https://github.com/gcode33/Toronto-Event-finder"
    }
]

export const ProjectSection = () => {
    return  <section id="projects" className="py-12 px-4 relative scroll-mt-32">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center"> 
                Featured <span className="text-primary"> Projects </span>
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here are some of my recent projects.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((projects, key)=>(
                   <div
                    key={key}
                    className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
                   >
                    <div className="h-48 overflow-hidden">
                        <img src={projects.image} alt={projects.title} className="object-cover transition-transform duration-500 group-hover:scale-110"/>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb:4">
                            {projects.tags.map((tags) => (
                                <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"> 
                                {tags}
                                </span>
                            ))}

                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 px-6 text-foreground">{projects.title}</h3>
                    <p className="text-sm text-muted-foreground px-6 mb-4">{projects.description}</p>
                    <a href={projects.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline px-6 pb-6 block"> <Github className="inline-block mr-1" /> View on GitHub </a>
                   </div> 
                ))}
            </div>
            <div className="text-center mt-4">
                <a href="https://github.com/gcode33" target="_blank" rel="noopener noreferrer" className="cosmic-button w-fit flex items-center mx-auto gap-2">
                   Check out my Github <ArrowRight size={16} />
                </a>
            </div>
        </div>
    </section>
};