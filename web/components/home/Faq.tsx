import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

const items = [
  {
    id: "1",
    title: "Why is upload service & deployment service seperate?",
    content:
        " deployment service handles the deployment of applications to various environments, while the upload service manages the uploading of files and assets required for those deployments. This separation allows for better scalability, security, and maintainability of each service." ,
    },
    {
    id: "2",
    title: "What does building the project means?",
    content:
      "Building the project refers to compiling and packaging your application code into a format suitable for deployment. This process typically involves transpiling TypeScript to JavaScript, bundling assets, and optimizing the code for production.",
  },
  {
    id: "3",
    title: "Why do we need to serve html, css & js file to the client? why not react?",
    content:
      "Serving HTML, CSS, and JavaScript files to the client is essential for rendering web pages in browsers. HTML provides the structure of the page, CSS styles it, and JavaScript adds interactivity and dynamic content. Together, they create a complete user experience on the web.",
  },
  {
    id: "4",
    title: "Does it support raw html, css & js files?",
    content:
      " Yes, the service supports raw HTML, CSS, and JavaScript files. You can upload and serve these files directly to clients, allowing for static website hosting or serving custom web applications without the need for additional frameworks or libraries.",
  },
];

function Faq() {
  return (
    <div className="md:border md:border-white-100 h-100  sm:w-[702px] md:w-[1152px] flex items-center justify-center mx-auto font-extrabold font-mono text-4xl">
    <div className="space-y-4 sm:max-w-[400px] md:max-w-[700px] flex-col items-center justify-center mx-auto ">
      <h2 className="text-xl font-bold font-mono hover:underline">FAQ</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                {item.title}
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-2 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
    </div>
  );
}

export { Faq };
