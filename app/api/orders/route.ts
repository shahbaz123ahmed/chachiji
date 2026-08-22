import { NextResponse } from "next/server";
import { getOrders, addOrder, updateOrderStatus, deleteOrder } from "@/lib/db";
import { Order } from "@/types/ecommerce";

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      apartment,
      city,
      state,
      pincode,
      paymentMethod,
      items,
      subtotal,
      discount,
      shippingFee,
      totalAmount,
    } = body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing required order details" },
        { status: 400 }
      );
    }

    const orderId = `CH-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: orderId,
      customerName,
      customerEmail: customerEmail || "",
      customerPhone,
      address,
      apartment: apartment || "",
      city,
      state,
      pincode,
      paymentMethod: paymentMethod || "cod",
      items,
      subtotal: subtotal || totalAmount,
      discount: discount || 0,
      shippingFee: shippingFee || 0,
      totalAmount,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);

    // Build structured WhatsApp message for Admin notification
    const itemsSummary = items
      .map(
        (i: any) =>
          `• ${i.quantity}x ${i.productName} (${i.weight}) - ₹${i.price * i.quantity}`
      )
      .join("\n");

    const waText = `🔔 *NEW ORDER RECEIVED - CHACHIJI.IN*\n\n` +
      `📦 *Order ID:* #${orderId}\n` +
      `👤 *Customer:* ${customerName}\n` +
      `📞 *Phone:* ${customerPhone}\n` +
      `📍 *Address:* ${address}, ${city}, ${state} - ${pincode}\n` +
      `💳 *Payment:* ${paymentMethod.toUpperCase()} (₹${totalAmount})\n\n` +
      `🛒 *Items:*\n${itemsSummary}\n\n` +
      `📅 *Date:* ${new Date().toLocaleString("en-IN")}`;

    const adminWhatsAppUrl = `https://wa.me/919264266890?text=${encodeURIComponent(waText)}`;

    return NextResponse.json({
      success: true,
      order: newOrder,
      whatsappUrl: adminWhatsAppUrl,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const updated = updateOrderStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update order status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const success = deleteOrder(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete order" },
      { status: 500 }
    );
  }
}
