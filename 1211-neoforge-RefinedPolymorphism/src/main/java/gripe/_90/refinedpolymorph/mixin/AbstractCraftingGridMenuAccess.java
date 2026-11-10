package gripe._90.refinedpolymorph.mixin;

import com.refinedmods.refinedstorage.common.grid.AbstractCraftingGridContainerMenu;
import com.refinedmods.refinedstorage.common.grid.CraftingGrid;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.gen.Accessor;

@Mixin(value = AbstractCraftingGridContainerMenu.class, remap = false)
public interface AbstractCraftingGridMenuAccess {
    @Accessor("craftingGrid")
    CraftingGrid refinedpolymorph$getCraftingGrid();
}
