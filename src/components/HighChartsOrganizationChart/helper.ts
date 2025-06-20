export const transformOrgChartData = (apiData: any) => {
  if (!apiData) return null;

  const nodes: any[] = [];
  const links: any[] = [];
  let idCounter = 0;
  const idMap = new Map();
  let maxDepth = 0;

  const assignId = (name: any) => {
    if (!idMap.has(name)) {
      idMap.set(name, idCounter.toString());
      idCounter++;
    }
    return idMap.get(name);
  };

  const traverse = (node: any, parentId = null, depth = 0) => {
    const nodeId = assignId(node.name);
    maxDepth = Math.max(maxDepth, depth);

    nodes.push({
      id: nodeId,
      // title: node.job_title,
      name: `<span style="font-size: 13px; font-weight: 500;">${node.job_title}</span>`,
    });

    if (parentId !== null) {
      links.push([parentId, nodeId]);
    }

    node.subordinates.forEach((sub: any) => traverse(sub, nodeId, depth + 1));
  };

  traverse(apiData);

  return {
    chart: { height: maxDepth === 1 ? 250 : 350, inverted: true, spacing: 8 },
    title: { text: "" },
    series: [
      {
        type: "organization",
        name: "Organization Chart",
        keys: ["from", "to"],
        data: links,
        nodes,
        colorByPoint: false,
        color: "#007ad0",
        dataLabels: { color: "white" },
        borderColor: "white",
        nodeWidth: 50,
        levels: [
          {
            level: 0,
            color: "#471E68",
            dataLabels: { color: "#fff" },
            height: 25,
          },
          {
            level: 1,
            color: "#471E68",
            dataLabels: { color: "#fff" },
            height: 25,
          },
          {
            level: 2,
            color: "#471E68",
            dataLabels: { color: "#fff" },
            height: 25,
          },
          {
            level: 3,
            color: "#471E68",
            dataLabels: { color: "#fff" },
            height: 25,
          },
        ],
        // hangingSide: 'right',
        hangingIndentTranslation: "shrink",
        borderRadius: 10,
      },
    ],
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    tooltip: { outside: true },
  };
};