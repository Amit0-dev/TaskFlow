// components/StreakHeatmap.jsx
import React from "react";
import HeatMap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const StreakHeatmap = ({ data }) => {
    const getClass = (value) => {
        if (!value) return "color-empty";
        // if(value) console.log({value})  // count, date, status
        return (
            {
                Completed: "color-complete",
                Partial: "color-partial",
                None: "color-none",
            }[value.status] || "color-empty"
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 rounded-xl bg-gray-900 shadow overflow-x-auto ">
            <div className="min-w-[700px]">
                <HeatMap
                    startDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                    endDate={new Date()}
                    values={data}
                    classForValue={getClass}
                    tooltipDataAttrs={(value) => ({
                        "data-tooltip-id": "tooltip-heatMap",
                        "data-tooltip-content": `${value.date} has count: ${value?.count || 0}`,
                    })}
                    onClick={(value) => alert(`Clicked on value with count: ${value?.count || 0}`)}
                />
            </div>

            <ReactTooltip
                id="tooltip-heatMap"
                place="top"
                className="!z-50"
                style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "6px",
                    padding: "6px 10px",
                }}
            />
        </div>
    );
};

export default StreakHeatmap;
