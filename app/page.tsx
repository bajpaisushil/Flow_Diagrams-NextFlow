"use client";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import firstImg from "./(assets)/krsn.png";
import Image from "next/image";
import Modal from "./(components)/Modal";

export default function App() {
  const initialNodes = [
    {
      id: "1",
      position: { x: 700, y: 100 },
      data: {
        label: (
          <div>
            <p>ID: 1</p>
            <div>
              <h1>Start</h1>
            </div>
          </div>
        ),
      },
    }
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
  ];
  const [open, setOpen] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeData, setNodeData] = useState<any>("");
  const [sourceNodeId, setSourceNodeId] = useState("");
  const [positionX, setPositionX] = useState<number>();
  const [positionY, setPositionY] = useState<number>();
  const [selectedTag, setSelectedTag] = useState("h1");
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );


  const tagComponents: {
    [key: string]: ({ children }: { children: any }) => React.JSX.Element;
  } = {
    h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
    p: ({ children }) => <p>{children}</p>,
    div: ({ children }) => <div className="text-[1rem]">{children}</div>,
    button: ({ children }) => <button className="border-2 bg-slate-100">{children}</button>,
    img: ({ children }) => (
      <Image width={500} height={500} src={children} alt="Image" />
    ),
    textarea: ({ children }) => <textarea className="min-h-10 resize" />,
  };

  const handleAddNode = () => {
    let newId = nodes.length + 1;

    const TagComponent = tagComponents[selectedTag];
    const selectedTagContent = <TagComponent>{nodeData}</TagComponent>;
    const newNode = {
      id: `${newId}`,
      position: { x: positionX, y: positionY },
      data: {
        label: (
          <div>
            <p>ID: {newId}</p>
            <div>{selectedTagContent}</div>
          </div>
        ),
      },
    };
    const newEdge = {
      id: `e${sourceNodeId}-${newId}`,
      source: `${sourceNodeId}`,
      target: `${newId}`,
    };
    console.log("before adding-> ", nodes, edges);
    setNodes((prevNodes: any) => [...prevNodes, newNode]);
    setEdges((prevEdges: any) => [...prevEdges, newEdge]);
    setPositionX(0);
    setPositionY(0);
    setSourceNodeId("");
    setNodeData("");
    setOpen(false);
  };

  const handleImageUpload = (e: any) => {
    e.preventDefault();
    const uploadedImg = e.target.files[0];
    if (uploadedImg) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImg);
      fileReader.addEventListener("load", function () {
        setSelectedImg(this.result);
        setNodeData(this.result);
      });
    }
  };

  useEffect(() => {
    console.log("Nodes after adding:", nodes);
    console.log("Edges after adding:", edges);
  }, [nodes, edges]);

  return (
    <div className="w-[100vw] h-[100vh] bg-red-200">
      <ReactFlow
        className=""
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
      <div className="">
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col">
            <h2 className="text-center font-bold">Add Nodes</h2>
            <div className="flex justify-center">
              <label className="m-2" htmlFor="elements">
                Select Tag:
              </label>
              <select
                name="elements"
                id="elements"
                value={selectedTag}
                className="justify-center m-1 border-2"
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="h1">h1</option>
                <option value="p">p</option>
                <option value="div">div</option>
                <option value="img">img</option>
                <option value="button">button</option>
                <option value="textarea">input</option>
              </select>
            </div>
            {selectedTag == "img" ? (
              <div>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept=".jpg, .png, .jpeg, .svg, .pdf"
                />
                {selectedImg && (
                  <img
                    src={selectedImg}
                    alt="img"
                    className="justify-center m-auto my-2 w-[15rem] h-[10rem]"
                  />
                )}
              </div>
            ) : (
              <input
                type="text"
                className="border-2 h-8 m-2 w-full pl-2"
                placeholder="Enter Node Data"
                value={nodeData}
                onChange={(e) => setNodeData(e.target.value)}
              />
            )}

            <input
              type="text"
              className="border-2 h-8 m-2 w-full pl-2"
              placeholder="Source Node ID"
              value={sourceNodeId}
              onChange={(e) => setSourceNodeId(e.target.value)}
            />
            <div className="flex flex-col">
              <input
                type="text"
                className="border-2 h-8 m-2 pl-2"
                placeholder="Position X"
                value={positionX}
                onChange={(e) => setPositionX(parseInt(e.target.value))}
              />
              <input
                type="text"
                className="border-2 h-8 m-2 pl-2"
                placeholder="Position Y"
                value={positionY}
                onChange={(e) => setPositionY(parseInt(e.target.value))}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-red-400 rounded-md hover:bg-red-600 p-2 text-white m-2"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-400 rounded-md hover:bg-blue-600 p-2 text-white m-2"
                onClick={() => {
                  setPositionX(0);
                  setPositionY(0);
                  setSourceNodeId("");
                  setNodeData("");
                }}
              >
                Clear
              </button>
              <button
                onClick={handleAddNode}
                className="bg-purple-500 hover:bg-purple-700 rounded-md text-white p-2 m-2"
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="absolute right-10 bottom-20 bg-blue-400 text-white p-2 border-2 border-black"
      >
        Add Node
      </button>
    </div>
  );
}
