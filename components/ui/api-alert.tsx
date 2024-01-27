"use client";

import toast from "react-hot-toast";
import { Copy, ServerIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


interface ApiAlertProps{
    title: string;
    description: string;
    variant: "public" | "admin"
};

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Publique",
    admin: "Admin"
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant= "public"
}) => {

    const onCopy = () =>{
        navigator.clipboard.writeText(description);
        toast.success("Route API copiée dans le presse-papiers")
    }

    return(
        <Alert>
            <ServerIcon className="w-4 h-4"/>
            <AlertTitle className="flex items-center gap-x-2 ">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="justify-between items-center flex mt-4 ">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-semibold font-mono text-sm">
                    {description}
                </code>
                <Button variant="outline" size="icon" onClick={onCopy}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}

