import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash?: { success?: string; error?: string };
};

export interface Strategy {
    id?: number;
    audience: string;
    problem: string;
    unique_angle: string;
    content_pillars: string[];
}

export interface CalendarVideo {
    id: number;
    week_number: number;
    title: string;
    topic: string;
    upload_date: string | null;
    status: "Planned" | "Filming" | "Editing" | "Published";
}

export interface Kpi {
    id: number;
    month: number;
    year: number;
    subscribers: number;
    avg_views: number;
    watch_hours: number;
    notes: string | null;
}

export type MenuItemProp = {
    title: string;
    href: string;
    icon?:
        | ForwardRefExoticComponent<
              Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
          >
        | ReactNode;
    variant:
        | "link"
        | "default"
        | "ghost"
        | "destructive"
        | "outline"
        | "secondary"
        | null
        | undefined;
};
