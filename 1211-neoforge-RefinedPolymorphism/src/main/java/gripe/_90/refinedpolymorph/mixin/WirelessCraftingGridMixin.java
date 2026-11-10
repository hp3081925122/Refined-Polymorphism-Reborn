package gripe._90.refinedpolymorph.mixin;

import com.refinedmods.refinedstorage.common.api.support.network.item.NetworkItemContext;
import com.refinedmods.refinedstorage.common.api.support.slotreference.SlotReference;
import com.refinedmods.refinedstorage.common.support.RecipeMatrix;
import com.refinedmods.refinedstorage.common.support.RecipeMatrixContainer;
import gripe._90.refinedpolymorph.GridSelection;
import gripe._90.refinedpolymorph.RecipeMatrixHooks;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.crafting.CraftingInput;
import net.minecraft.world.item.crafting.CraftingRecipe;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(targets = "com.refinedmods.refinedstorage.quartzarsenal.common.wirelesscraftinggrid.WirelessCraftingGrid", remap = false)
public class WirelessCraftingGridMixin implements GridSelection {
    @Shadow
    private RecipeMatrix<CraftingRecipe, CraftingInput> craftingRecipe;

    private Player refinedpolymorph$player;

    @Inject(method = "<init>", at = @At("TAIL"))
    private void refinedpolymorph$bind(Player player, NetworkItemContext context, SlotReference slotReference, CallbackInfo callback) {
        refinedpolymorph$player = player;
        ((RecipeMatrixHooks) craftingRecipe).refinedpolymorph$bindPlayer(player);
        if (!player.level().isClientSide()) {
            ((RecipeMatrixHooks) craftingRecipe).refinedpolymorph$invalidateAndUpdate(player.level());
        }
    }

    @Override
    public RecipeMatrixContainer refinedpolymorph$getCraftingMatrix() {
        return craftingRecipe.getMatrix();
    }

    @Override
    public void refinedpolymorph$refreshFromSelection() {
        if (refinedpolymorph$player != null && refinedpolymorph$player.level() != null) {
            ((RecipeMatrixHooks) craftingRecipe).refinedpolymorph$invalidateAndUpdate(refinedpolymorph$player.level());
        }
    }
}
