import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SimulatorService } from 'src/app/services/simulator/simulator.service';
import { TreeNode } from 'primeng/api';
import { ISimulator } from 'src/app/models/simulator.model';

@Component({
  selector: 'app-simulator-tree',
  templateUrl: './simulator-tree.component.html',
  styleUrls: ['./simulator-tree.component.scss']
})
export class SimulatorTreeComponent implements OnInit {
  @Output() onChangeSimulator = new EventEmitter();
  simulatorsOptions: TreeNode[];
  nodeSelected;

  constructor(private simulatorService: SimulatorService) { }

  ngOnInit(): void {
    this.simulatorService.simulators$
      .subscribe(simulators => {
        this.mapSimulatorsToOptions(simulators);
      })
  }

  mapSimulatorsToOptions(simulators: ISimulator[]) {
    this.simulatorsOptions = simulators
      .map((simulator) => {
        return {
          label: simulator.name,
          data: simulator.id,
          selectable: false,
          children: simulator.types.map(type => ({
            label: type.name,
            type: 'simulator_item',
            data: {
              simulator: simulator,
              type: type
            }
          }))
        }
      });
  }

  nodeSelect({ node }) {
    if (node.type === 'simulator_item') {
      this.onChangeSimulator.emit(node.data)
    }
  };

}
