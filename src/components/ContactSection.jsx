import { Contact2, Mail, Phone, MapPin, Linkedin } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-4 flex items-center justify-center min-h-[60vh]">
            <div className="max-w-xl w-full text-center flex flex-col items-center justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Get in <span className="text-primary">Touch</span>
                </h2>
                <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                    I'm always open to discussing new projects and ideas.
                </p>
                <div className="space-y-8 w-full flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-3 justify-center">
                            <Mail className="text-muted-foreground" />
                            <a href="mailto:FotabongGeorgeJr@gmail.com" className="text-foreground hover:underline">
                                FotabongGeorgeJr@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center space-x-3 justify-center">
                            <Phone className="text-muted-foreground" />
                            <a href="tel:+12899370842" className="text-foreground hover:underline">
                                +1 (289) 937-0842
                            </a>
                        </div>
                        <div className="flex items-center space-x-3 justify-center">
                            <MapPin className="text-muted-foreground" />
                            <span className="text-foreground">Toronto, Canada</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Connect with me</h3>
                        <div className="flex items-center space-x-3 justify-center">
                            <Linkedin className="text-muted-foreground" />
                            <a target="_blank" href="https://www.linkedin.com/in/george-fotabong-b10b92202/" rel="noopener noreferrer" className="text-foreground hover:underline">
                                linkedin.com/in/george-fotabong-b10b92202
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};