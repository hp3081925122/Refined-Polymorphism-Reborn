package gripe._90.refinedpolymorph.mixin;

import com.illusivesoulworks.polymorph.api.PolymorphApi;
import gripe._90.refinedpolymorph.RecipeMatrixHooks;
import javax.annotation.Nullable;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.crafting.Recipe;
import net.minecraft.world.item.crafting.RecipeHolder;
import net.minecraft.world.item.crafting.RecipeInput;
import net.minecraft.world.item.crafting.RecipeManager;
import net.minecraft.world.item.crafting.RecipeType;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

@Mixin(value = com.refinedmods.refinedstorage.common.support.RecipeMatrix.class, remap = false)
public abstract class RecipeMatrixMixin implements RecipeMatrixHooks {
    @Shadow
    @Nullable
    private RecipeHolder<?> currentRecipe;

    @Shadow
    private void updateResult(Level level) {
    }

    @Nullable
    private BlockEntity refinedpolymorph$blockEntity;

    @Nullable
    private Player refinedpolymorph$player;

    @Override
    public void refinedpolymorph$bindBlockEntity(BlockEntity blockEntity) {
        refinedpolymorph$blockEntity = blockEntity;
    }

    @Override
    public void refinedpolymorph$bindPlayer(Player player) {
        refinedpolymorph$player = player;
    }

    @Override
    @Nullable
    public RecipeHolder<?> refinedpolymorph$getCurrentRecipe() {
        return currentRecipe;
    }

    @Override
    public void refinedpolymorph$invalidateAndUpdate(Level level) {
        currentRecipe = null;
        updateResult(level);
    }

    @Redirect(
            method = "loadRecipe",
            at = @At(
                    value = "INVOKE",
                    target = "Lnet/minecraft/world/item/crafting/RecipeManager;getRecipeFor(Lnet/minecraft/world/item/crafting/RecipeType;Lnet/minecraft/world/item/crafting/RecipeInput;Lnet/minecraft/world/level/Level;)Ljava/util/Optional;"
            )
    )
    private <I extends RecipeInput, T extends Recipe<I>> java.util.Optional<RecipeHolder<T>> refinedpolymorph$getRecipe(
            RecipeManager manager, RecipeType<T> type, I input, Level level) {
        if (type == RecipeType.CRAFTING && refinedpolymorph$blockEntity != null) {
            return PolymorphApi.getInstance().getRecipeManager()
                    .getBlockEntityRecipe(type, input, level, refinedpolymorph$blockEntity);
        }
        if (type == RecipeType.CRAFTING && refinedpolymorph$player != null) {
            return PolymorphApi.getInstance().getRecipeManager()
                    .getPlayerRecipe(refinedpolymorph$player.containerMenu, type, input, level, refinedpolymorph$player);
        }
        return manager.getRecipeFor(type, input, level);
    }
}
