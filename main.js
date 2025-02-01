const app = document.getElementById('root')

const htmlTag = `
    <div class="container">
        <!-- Container for both tables displayed in a row -->
        <div class="tables-row">
            <!-- Monte Data Table -->
            <div class="table-container1">

                <div class="title">
                <img src="assets/table.png" width="50" height="50" alt="Simulation Image">
                <h2 class="monte-title">Monte Carlo Simulation Table</h2>
                </div>

                <div class="group-btn">
                <button id="add-monte-row"><img src="assets/add.png" width="20" height="20" alt="add"> Add Row</button>
                <button id="remove-monte-row"><img src="assets/remove.png" width="20" height="20" alt="add"> Remove Row</button>
                </div>

                <table id="monte-data-table">
                    <thead>
                        <tr>
                            <th contenteditable="true" data-placeholder="Enter label.."></th>
                            <th contenteditable="true" data-placeholder="Enter label.."></th>
                            <th>Probability</th>
                            <th>Cumulative Probability</th>
                            <th>Random Number Interval</th>
                        </tr>
                    </thead>                    
                    <tbody>
                        <!-- Dynamic rows will be added here -->
                    </tbody>
                </table>
            </div>

            <!-- Simulation Table -->
            <div class="table-container2">

                <div class="title">
                <img src="assets/simulation.png" width="50" height="50" alt="Simulation Image">
                <h2 class="monte-title">Simulation</h2>
                </div>

                <div class="group-btn">
                <button id="add-simulation-row"> <img src="assets/add.png" width="15" height="15" alt="add"> Add Simulation</button>
                <button id="run-simulation"><img src="assets/play.png" width="15" height="15" alt="add">Run Simulation</button>
                </div>

                <table id="simulation-table">
                    <thead>
                        <tr>
                            <th># of Simulation</th>
                            <th>Random Number</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Dynamic rows will be added here -->
                    </tbody>
                </table>
            </div>

        </div>
    </div>
`

app.innerHTML = htmlTag;