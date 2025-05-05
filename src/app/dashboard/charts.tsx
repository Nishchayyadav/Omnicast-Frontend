"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Dot, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { use, useEffect, useState } from "react";

type Payment = {
  id: string;
  name: string;
  email: string;
};

type Groups = Record<string, Payment[]>;

type GroupColor = {
  name: string;
  color: string;
};

type ChartDatum = { browser: string; visitors: number; fill: string };
type ChartConfigEntry = { label: string; color: string };

export function Component({
  groups,
  rawData,
  loading,
}: {
  groups: any[];
  rawData: Record<string, Payment[]>;
  loading: boolean;
}) {
  const group = groups as GroupColor[];
  const data = rawData as Groups;
  const [chartData, setChartData] = useState<ChartDatum[]>([]);
  const [chartConfig, setChartConfig] = useState<
    Record<string, ChartConfigEntry>
  >({
    visitors: {
      label: "Visitors",
      color: "hsl(var(--chart-2))",
    },
  });

  useEffect(() => {
    const newChartData: ChartDatum[] = [];
    const newChartConfig: Record<string, ChartConfigEntry> = {
      visitors: {
        label: "Visitors",
        color: "hsl(var(--chart-2))",
      },
    };

    for (const { name, color } of group) {
      const members = data[name] || [];

      newChartData.push({
        browser: name,
        visitors: members.length,
        fill: color,
      });

      newChartConfig[name] = {
        label: name,
        color,
      };
    }

    setChartData(newChartData);
    setChartConfig(newChartConfig);
  }, [group, data]); // 👈 Add these dependencies

  return (
    <Card>
      <CardHeader>
        <CardTitle className="sm:text-base text-sm">
          Contact Distribution by Group
        </CardTitle>
        <CardDescription className="sm:text-sm text-xs mt-[-3px]">
          Number of contacts segmented across all groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="browser"
                  // labelKey="Count"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="visitors"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.browser}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm pb-[5px]">
        <div className="flex gap-2 font-medium leading-none sm:text-base text-sm">
          Updated clustering overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground sm:text-sm text-xs">
          Visual breakdown of group sizes based on current contact data
        </div>
      </CardFooter>
    </Card>
  );
}
