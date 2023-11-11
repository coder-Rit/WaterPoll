import React, { useEffect, useRef, useState } from "react";
import Graph from "react-vis-network-graph";
import "./network.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import {
  deleteNetwork,
  getNetwork,
  updateNetwork,
} from "../../actions/networkActions";
const NetworkPolt = () => {
  let dispatch = useDispatch();

  const renameDiv = useRef(null);

  const { network, isNetworkLoaded } = useSelector((state) => state.network);

  const [netWork, setnetWork] = useState();
  const [NewNodeName, setNewNodeName] = useState(String);
  const [current_node, set_current_node] = useState(Number);

  // const graph = {
  //   nodes: [
  //     {
  //       id: 1,
  //       label: "Node 1",
  //       title: "Node 1 Tooltip Text",
  //     },
  //     {
  //       id: 2,
  //       label: "Node 2",
  //       title: "Node 2 Tooltip Text",
  //     },
  //     {
  //       id: 3,
  //       label: "Node 3",
  //       title: "Node 3 Tooltip Text",
  //     },
  //     {
  //       id: 4,
  //       label: "Node 4",
  //       title: "Node 4 Tooltip Text",
  //     },
  //     {
  //       id: 5,
  //       label: "Node 5",
  //       title: "Node 5 Tooltip Text",
  //     },
  //     {
  //       id: 6,
  //       label: "Node 6",
  //       title: "Node 6 Tooltip Text",
  //     },
  //     {
  //       id: 7,
  //       label: "Node 7",
  //       title: "Node 7 Tooltip Text",
  //     },
  //     {
  //       id: 8,
  //       label: "Node 8",
  //       title: "Node 8 Tooltip Text",
  //     },
  //   ],
  //   edges: [
  //     { from: 1, to: 1 },
  //     { from: 1, to: 7 },
  //     { from: 1, to: 3 },
  //     { from: 6, to: 5 },
  //     { from: 2, to: 4 },
  //     { from: 6, to: 2 },
  //     { from: 7, to: 2 },
  //     { from: 6, to: 7 },
  //     { from: 6, to: 8 },
  //     { from: 7, to: 8 },
  //     { from: 8, to: 2 },
  //     { from: 3, to: 7 },
  //   ],
  // };

  const options = {
    layout: {
      hierarchical: {
        enabled: true,
        direction: "LR",
        levelSeparation: 300,
      },
    },
    edges: {
      color: "#86581a",
      width: 2,
    },
    height: "650px",
    physics: {
      stabilization: {
        enabled: true,
        iterations: 500,
      },
    },
  };

  // fuctionaites
  const upgradeGraph = (data) => {
    let newData = data;

    const nodeSetting = {
      shape: "box",
      color: {
        background: "#734100",
        border: "#A56917",
        highlight: {
          background: "#683D03",
          border: "#A56917",
        },
      },
      size: 40,
      borderWidth: 2,
      font: {
        size: 12,
        color: "#E4E4E4",
      },
    };

    const modifiedNodes = data.nodes.map((element) => ({
      ...element,
      ...nodeSetting,
    }));

    newData.nodes = modifiedNodes;

    return newData;
  };

  const makeDataMap = (pathList) => {
    let hashMap = [];

    for (let index = 0; index < pathList.length; index++) {
      let pathsArray = pathList[index].split("/");
      const lastNode = pathsArray[pathList.length];
      pathsArray.pop();

      const listObj = {
        grp: pathsArray.join("/"),
        sys: [lastNode],
      };

      const idx = hashMap.findIndex((ele) => ele.grp === listObj.grp);
      if (idx !== -1) {
        hashMap[idx].sys.push(lastNode);
      } else {
        hashMap.push(listObj);
      }
    }

    return hashMap;
  };

  const findOriginNode = (edgs) => {
    let origin = -1;

    for (let idx1 = 0; idx1 < edgs.length; idx1++) {
      let state = false;
      for (let idx2 = 0; idx2 < edgs.length; idx2++) {
        if (edgs[idx1].from === edgs[idx2].to) {
          state = true;
        }
      }
      if (!state) {
        origin=edgs[idx1]
      }
    }
    if (origin===-1) {
      window.prompt(origin ," Origin is not origin")
    }
    return origin;
  };

  const formateNetwork = (dtat) => {
    const { edges, nodes } = dtat;
    let allpaths = [];

    const getNodeNameOf = (id) => {
      return netWork.nodes.filter((ele) => ele.id === id)[0].label;
    };

    const recursion = (firstege, path) => {
      path = path + "/" + getNodeNameOf(firstege.to);
      let connection = edges.filter((el) => el.from === firstege.to);

      if (connection.length === 0) {
        allpaths.push(path);
      }

      for (let index = 0; index < connection.length; index++) {
        recursion(connection[index], path);
      }
    };
    recursion(findOriginNode(edges), getNodeNameOf(2));
    console.log(makeDataMap(allpaths));
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      if (nodes.length !== 0) {
        set_current_node(nodes[0]);
      }
    },
  };

  const renameNode = () => {
    const data = netWork.nodes.map((el) => {
      if (el.id === current_node) return { ...el, label: NewNodeName };
      else return el;
    });

    const temp = { ...netWork };
    temp.nodes = data;
    setnetWork(temp);
    setNewNodeName("");
  };

  const saveLayout = () => {
    let cleanNetwork = netWork;

    for (let i = 0; i < cleanNetwork.nodes.length; i++) {
      delete cleanNetwork.nodes[i].shape;
      delete cleanNetwork.nodes[i].color;
      delete cleanNetwork.nodes[i].size;
      delete cleanNetwork.nodes[i].font;
    }

    dispatch(updateNetwork(cleanNetwork));
  };
  const clearLayout = () => {
    dispatch(deleteNetwork(netWork._id));
  };

  //useeffects
  useEffect(() => {
    dispatch(getNetwork());
  }, []);

  useEffect(() => {
    if (isNetworkLoaded) {
      setnetWork(upgradeGraph(network));
    }
  }, [isNetworkLoaded]);

  useEffect(() => {
    if (netWork) {
      formateNetwork(netWork);
    }
  }, [netWork]);

  return isNetworkLoaded ? (
    <>
      <div>
        <div className="graphDiv">
          <Graph graph={netWork} options={options} events={events} />
        </div>
        <div className="editorDiv">
          <div>
            <input
              id="input"
              type="text"
              value={NewNodeName}
              placeholder="new node name"
              onChange={(e) => setNewNodeName(e.target.value)}
            />
            <button onClick={() => renameNode()}>Rename a node</button>
          </div>
          <button onClick={() => saveLayout()}>Save layout</button>
          <button onClick={clearLayout}>Destroy layout</button>
        </div>
      </div>
    </>
  ) : (
    <Loader></Loader>
  );
};

export default NetworkPolt;
