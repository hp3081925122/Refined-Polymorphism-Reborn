package gripe._90.refinedpolymorph.mixin;

import com.refinedmods.refinedstorage.common.autocrafting.PatternResolver;
import com.refinedmods.refinedstorage.common.autocrafting.PatternState;
import gripe._90.refinedpolymorph.RefinedPolymorphismComponents;
import java.util.Optional;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.crafting.CraftingRecipe;
import net.minecraft.world.item.crafting.Recipe;
import net.minecraft.world.item.crafting.RecipeHolder;
import net.minecraft.world.item.crafting.RecipeInput;
import net.minecraft.world.item.crafting.RecipeManager;
import net.minecraft.world.item.crafting.RecipeType;
import net.minecraft.world.level.Level;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.Redirect;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

@Mixin(value = PatternResolver.class, remap = false)
public class PatternResolverMixin {
    private static final ThreadLocal<ItemStack> PATTERN = new ThreadLocal<>();

    @Inject(
            method = "getCraftingPattern(Lnet/minecraft/world/item/ItemStack;Lnet/minecraft/world/level/Level;Lcom/refinedmods/refinedstorage/common/autocrafting/PatternState;)Ljava/util/Optional;",
            at = @At("HEAD")
    )
    private void refinedpolymorph$capture(ItemStack stack, Level level, PatternState patternState, CallbackInfoReturnable<?> callback) {
        PATTERN.set(stack);
    }

    @Inject(
            method = "getCraftingPattern(Lnet/minecraft/world/item/ItemStack;Lnet/minecraft/world/level/Level;Lcom/refinedmods/refinedstorage/common/autocrafting/PatternState;)Ljava/util/Optional;",
            at = @At("RETURN")
    )
    private void refinedpolymorph$clear(ItemStack stack, Level level, PatternState patternState, CallbackInfoReturnable<?> callback) {
        PATTERN.remove();
    }

    @SuppressWarnings("unchecked")
    @Redirect(
            method = "getCraftingPattern(Lnet/minecraft/world/level/Level;Lcom/refinedmods/refinedstorage/common/autocrafting/PatternState;Lcom/refinedmods/refinedstorage/common/autocrafting/CraftingPatternState;)Ljava/util/Optional;",
            at = @At(
                    value = "INVOKE",
                    target = "Lnet/minecraft/world/item/crafting/RecipeManager;getRecipeFor(Lnet/minecraft/world/item/crafting/RecipeType;Lnet/minecraft/world/item/crafting/RecipeInput;Lnet/minecraft/world/level/Level;)Ljava/util/Optional;"
            )
    )
    private <I extends RecipeInput, T extends Recipe<I>> Optional<RecipeHolder<T>> refinedpolymorph$getStoredRecipe(
            RecipeManager manager, RecipeType<T> type, I input, Level level) {
        ItemStack stack = PATTERN.get();
        if (stack != null) {
            ResourceLocation recipeId = stack.get(RefinedPolymorphismComponents.RECIPE.get());
            if (recipeId != null) {
                Optional<RecipeHolder<?>> stored = level.getRecipeManager().byKey(recipeId);
                if (stored.isPresent() && stored.get().value() instanceof CraftingRecipe) {
                    return (Optional<RecipeHolder<T>>) (Optional<?>) stored;
                }
            }
        }
        return manager.getRecipeFor(type, input, level);
    }
}
