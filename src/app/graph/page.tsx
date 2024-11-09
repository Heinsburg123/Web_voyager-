import GraphView from "../components/Graph";
import { fetchGraphData } from "../lib/actions";

export default async function Page(){
    const graphData = await fetchGraphData()
    return (
        <div>
            <GraphView graphData = {graphData}></GraphView>
        </div>
    )
}