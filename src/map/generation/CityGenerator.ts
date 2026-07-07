import { WorldGrid } from '@/map/WorldGrid';

import { PrimaryRoadGenerator } from '@/map/generation/PrimaryRoadGenerator';
import { SecondaryRoadGenerator } from '@/map/generation/SecondaryRoadGenerator';
import { DistrictGenerator } from '@/map/generation/DistrictGenerator';
import { ParkGenerator } from '@/map/generation/ParkGenerator';
import { BuildingGenerator } from '@/map/generation/BuildingGenerator';

export class CityGenerator {

    private readonly primaryRoads =
        new PrimaryRoadGenerator();

    private readonly secondaryRoads =
        new SecondaryRoadGenerator();

    private readonly districts =
        new DistrictGenerator();

    private readonly parks =
        new ParkGenerator();

    private readonly buildingGenerator =
        new BuildingGenerator();

    public generate(grid: WorldGrid): void {

        this.primaryRoads.generate(grid);

        this.secondaryRoads.generate(grid);

        this.districts.generate(grid);

        this.parks.generate(grid);

        this.buildingGenerator.generate(grid);

    }

    public getBuildingRegistry() {

        return this.buildingGenerator.getRegistry();

    }

}