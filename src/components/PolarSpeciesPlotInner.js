import React, { useState } from "react";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinearGradient } from "@visx/gradient";
import { pointRadial } from "d3-shape";
import { LinkRadial } from "@visx/shape";
import IframeSpeciesInfo from "./IframeSpeciesInfo";

const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };

function PolarSpeciesPlotInner({
  data,
  width,
  height,
  margin = defaultMargin,
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [iframeOpen, setIframeOpen] = useState(false);
  const handleNode = (node) => {
    setSelectedNode(node);
    setIframeOpen(true);
  }
  // const [layout, setLayout] = useState("cartesian");
  // const [orientation, setOrientation] = useState < string > "horizontal";
  // const [linkType, setLinkType] = useState < string > "diagonal";
  // const [stepPercent, setStepPercent] = useState < number > 0.5;
  //   const forceUpdate = useForceUpdate();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const origin = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  const sizeWidth = 2 * Math.PI;
  const sizeHeight = Math.min(innerWidth, innerHeight) / 2;

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <LinearGradient id="links-gradient" from="#3caa54" to="#aae6a2" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkRadial
                    key={i}
                    data={link}
                    percent={0.5}
                    stroke="rgb(150,60,120,0.9)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 100;
                  const height = 20;

                  const [radialX, radialY] = pointRadial(node.x, node.y);
                  const top = radialY;
                  const left = radialX;

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <circle
                          r={12}
                          fill="url('#links-gradient')"
                        />
                      )}
                      {node.depth !== 0 && (
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="rgba(255,255,0,0)"
                          stroke={"none"}
                          strokeWidth={1}
                          strokeDasharray={node.data.children ? "0" : "2,2"}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={node.data.children ? 0 : 10}
                          onClick={() => {
                            handleNode(node.data.name)
                            // console.log(node);
                            // forceUpdate();
                          }}
                        />
                      )}
                      <text
                        dy=".33em"
                        fontSize={10}
                        fontFamily="Arial"
                        textAnchor="middle"
                        stroke={"white"}
                        strokeWidth={"2"}
                        paintOrder="stroke"
                        // stroke: #000000;
                        // stroke-width: 1px;
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        style={{ pointerEvents: "none" }}
                        fill={
                          node.depth === 0
                            ? "#71248e"
                            : node.children
                            ? "black"
                            : "blue"
                        }
                      >
                        {node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
      <IframeSpeciesInfo name={selectedNode} open={iframeOpen} setOpen={setIframeOpen} />
    </div>
  );
}

export default React.memo(PolarSpeciesPlotInner);