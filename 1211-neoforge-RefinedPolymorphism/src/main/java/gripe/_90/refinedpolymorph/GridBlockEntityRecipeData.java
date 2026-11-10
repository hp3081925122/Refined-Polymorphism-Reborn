package gripe._90.refinedpolymorph;

import com.illusivesoulworks.polymorph.common.capability.AbstractBlockEntityRecipeData;
import com.refinedmods.refinedstorage.common.support.RecipeMatrixContainer;
import net.minecraft.core.NonNullList;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.crafting.RecipeHolder;
import net.minecraft.world.level.block.entity.BlockEntity;
import org.jetbrains.annotations.NotNull;

public class GridBlockEntityRecipeData extends AbstractBlockEntityRecipeData<BlockEntity> {
    public GridBlockEntityRecipeData(BlockEntity owner) {
        super(owner);
    }

    @Override
    protected NonNullList<ItemStack> getInput() {
        if (getOwner() instanceof GridSelection selection && getOwner().hasLevel()) {
            RecipeMatrixContainer matrix = selection.refinedpolymorph$getCraftingMatrix();
            NonNullList<ItemStack> stacks = NonNullList.withSize(matrix.getContainerSize(), ItemStack.EMPTY);
            for (int i = 0; i < matrix.getContainerSize(); i++) {
                stacks.set(i, matrix.getItem(i));
            }
            return stacks;
        }
        return NonNullList.create();
    }

    @Override
    public void selectRecipe(@NotNull RecipeHolder<?> recipe) {
        super.selectRecipe(recipe);
        if (getOwner() instanceof GridSelection selection) {
            selection.refinedpolymorph$refreshFromSelection();
        }
    }
}
