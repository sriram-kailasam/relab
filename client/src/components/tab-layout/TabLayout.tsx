import React, { HTMLAttributes, useState } from "react";
import "./TabLayout.scss";
import classNames from "classnames";

interface TabLayoutProps extends HTMLAttributes<"div"> {
  titles: string[];
  initialIndex?: number;
  components: JSX.Element[];
}

export const TabLayout: React.FC<TabLayoutProps> = props => {
  const [selectedIndex, setSelectedIndex] = useState(
    props.initialIndex ? props.initialIndex : 0
  );

  return (
    <div className="rl-tab-layout">
      <div className="rl-titles">
        {props.titles.map((title, index) => (
          <h3
            className={classNames({
              "rl-title": true,
              "rl-selected": index === selectedIndex
            })}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {title}
          </h3>
        ))}
      </div>
      <div className="rl-components">
        {selectedIndex <= props.components.length
          ? props.components[selectedIndex]
          : null}
      </div>
    </div>
  );
};
