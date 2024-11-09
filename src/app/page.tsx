import ChatBox from "./ui/chatbox";
import GraphView from "./components/Graph";
import { fetchGraphData } from "./lib/actions";

export default async function Home() {
  const graphData = await fetchGraphData()

  return (
    <div className="flex w-screen h-screen p-3 bg-cyan-100">
      <div className="basis-3/4 bg-white rounded-lg mr-3">
      <GraphView graphData = {graphData}></GraphView>
      </div>
      <ChatBox />
    </div>
  );
}
