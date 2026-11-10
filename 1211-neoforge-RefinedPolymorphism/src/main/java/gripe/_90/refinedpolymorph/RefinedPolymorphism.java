package gripe._90.refinedpolymorph;

import com.illusivesoulworks.polymorph.api.PolymorphApi;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridBlockEntity;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridContainerMenu;
import com.refinedmods.refinedstorage.common.grid.CraftingGrid;
import com.refinedmods.refinedstorage.common.grid.CraftingGridBlockEntity;
import com.refinedmods.refinedstorage.common.grid.CraftingGridContainerMenu;
import gripe._90.refinedpolymorph.mixin.AbstractCraftingGridMenuAccess;
import gripe._90.refinedpolymorph.mixin.PatternGridMenuAccess;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.ModContainer;
import net.neoforged.fml.common.Mod;
import net.neoforged.fml.loading.FMLEnvironment;

@Mod(RefinedPolymorphism.MOD_ID)
public final class RefinedPolymorphism {
    public static final String MOD_ID = "refinedpolymorph";

    public RefinedPolymorphism(IEventBus modEventBus, ModContainer modContainer) {
        RefinedPolymorphismComponents.DATA_COMPONENTS.register(modEventBus);
        modEventBus.addListener(GridRecipeSelectPayload::register);

        PolymorphApi api = PolymorphApi.getInstance();
        api.registerBlockEntity(CraftingGridBlockEntity.class, blockEntity ->
                blockEntity instanceof CraftingGridBlockEntity ? new GridBlockEntityRecipeData(blockEntity) : null);
        api.registerBlockEntity(PatternGridBlockEntity.class, blockEntity ->
                blockEntity instanceof PatternGridBlockEntity ? new GridBlockEntityRecipeData(blockEntity) : null);
        api.registerMenu(menu -> {
            if (menu instanceof CraftingGridContainerMenu craftingMenu) {
                CraftingGrid grid = ((AbstractCraftingGridMenuAccess) craftingMenu).refinedpolymorph$getCraftingGrid();
                if (grid instanceof BlockEntity blockEntity) {
                    return blockEntity;
                }
            }
            if (menu instanceof PatternGridContainerMenu patternMenu) {
                return ((PatternGridMenuAccess) patternMenu).refinedpolymorph$getPatternGrid();
            }
            return null;
        });

        if (FMLEnvironment.dist.isClient()) {
            RefinedPolymorphismClient.registerWidget();
        }
    }
}
