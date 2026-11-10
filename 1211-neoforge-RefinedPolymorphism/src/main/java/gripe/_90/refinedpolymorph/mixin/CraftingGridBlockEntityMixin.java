package gripe._90.refinedpolymorph.mixin;

import com.refinedmods.refinedstorage.common.grid.CraftingGridBlockEntity;
import com.refinedmods.refinedstorage.common.support.RecipeMatrix;
import com.refinedmods.refinedstorage.common.support.RecipeMatrixContainer;
import gripe._90.refinedpolymorph.GridSelection;
import gripe._90.refinedpolymorph.RecipeMatrixHooks;
import net.minecraft.world.item.crafting.CraftingInput;
import net.minecraft.world.item.crafting.CraftingRecipe;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import org.spongepowered.asm.mixin.Final;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(value = CraftingGridBlockEntity.class, remap = false)
public abstract class CraftingGridBlockEntityMixin implements GridSelection {
    @Shadow
    @Final
    private RecipeMatrix<CraftingRecipe, CraftingInput> craftingRecipe;

    @Inject(method = "<init>", at = @At("TAIL"))
    private void refinedpolymorph$bind(CallbackInfo callback) {
        ((RecipeMatrixHooks) craftingRecipe).refinedpolymorph$bindBlockEntity((BlockEntity) (Object) this);
    }

    @Override
    public RecipeMatrixContainer refinedpolymorph$getCraftingMatrix() {
        return craftingRecipe.getMatrix();
    }

    @Override
    public void refinedpolymorph$refreshFromSelection() {
        Level level = ((BlockEntity) (Object) this).getLevel();
        if (level != null) {
            ((RecipeMatrixHooks) craftingRecipe).refinedpolymorph$invalidateAndUpdate(level);
        }
    }
}
